require('../config');
const fs = require('fs');
const md5 = require('js-md5');
const express = require('express');
const multer = require('multer');
const moment = require('moment');

const router = express.Router();
const Model = require('../db/index');
const StaticFile = Model.getModel('staticFileSchema');
const _U = require('../lib/utils');
const _C = require('../lib/constants');

const filePath = './uploadFiles/';
const filePathAppstore = './uploadFiles/appstore';
// ! 所有关于「flower」的内容都与本博客系统无关，请忽略，不会影响正常功能！
const flowerPwd = global.FLOWERS_PWD || 'flowersPwd';
const reagentAppPwd = global.REAGENT_APP_PWD || '1';


// 磁盘存储引擎可以让你控制文件的存储
// 有两个选项可用，destination 和 filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type } = req.body;
    if (type === 'reagentapp') {
      // appstore 需单独一个文件夹
      cb(null, 'uploadFiles/appstore');
    } else {
      cb(null, 'uploadFiles/');
    }
  },
  filename: (req, file, cb) => {
    const { type } = req.body,
      fileOriginalName = file.originalname;
    if (type === 'flowers') {
      cb(null,
        Date.now() + '-' +
        md5(JSON.stringify(file)) + '.' +
         fileOriginalName.split('.')[fileOriginalName.split('.').length-1]
      );
    } else if (type === 'reagentapp') {
      // appstore 不需要重定义文件名
      cb(null, fileOriginalName);
    } else {
      // 保存的文件名为   [时间戳]-[原始文件名]
      cb(null, Date.now() + '-' + fileOriginalName);
    }
  },

});

_U.createFolder(filePath);
_U.createFolder(filePathAppstore);

const upload = multer({ storage });
router.post('/up', upload.single('file'), (req, res, next) => {
  const file = req.file,
    { type } = req.body;
  const tempFileInfo = {
    filename: file.filename,
    filePath: file.path,
    fileSize: file.size,
    fileMimeType: file.mimetype,
    fileDestination: file.destination,
    fileOriginalName: file.originalname,
    fileEncoding: file.encoding
  };
  if (type === 'flowers') {
  // the type is flowers
    StaticFile.findOne({key: 'flowers'},  (err, doc) => {
      if (doc && doc._id) {
        // 更新
        StaticFile.updateOne({key: 'flowers'}, { createTime: Date.now(), ...tempFileInfo}, (err, doc) => {
          if (err) {
            return res.json(_C.CODE_ERROR);
          } else {
            return res.json({ ... _C.CODE_SUCCESS, msg: '上传成功' });
          }
        });
      } else {
        const staticfile = new StaticFile({
          key: 'flowers',
          ...tempFileInfo
        });
        staticfile.save((err, doc) => {
          if (!err) {
            res.json({
              ..._C.CODE_SUCCESS,
              msg: '上传成功'
            });
          } else {
            res.json(_C.CODE_ERROR);
          }
        });
      }
    });
  } else if (type === 'reagentapp') { // 试剂管理app的存储
    StaticFile.findOne({ key: 'reagentapp', fileOriginalName: file.originalname }, (err, doc) => {
      if (doc && doc._id) {
        // 更新
        StaticFile.updateOne({ key: 'reagentapp', ...tempFileInfo }, (err, doc) => {
          if (err) {
            return res.json(_C.CODE_ERROR);
          } else {
            return res.json({ ..._C.CODE_SUCCESS, msg: '上传成功' });
          }
        });

      } else {
        // 新建
        const staticFile = new StaticFile({
          key: 'reagentapp',
          ...tempFileInfo
        });

        staticFile.save((err, doc) => {
          if (err) return res.json(_C.CODE_ERROR);
          else {
            return res.json({ ..._C.CODE_SUCCESS, msg: '上传成功' });
          }
        });
      }

    });

  } else {
    // the type is normal
    const staticfile = new StaticFile({
      key: 'normal',
      ...tempFileInfo
    });
    staticfile.save((err, doc) => {
      if (!err) {
        res.json({
          ..._C.CODE_SUCCESS,
          msg: '上传成功'
        });
      } else {
        res.json(_C.CODE_ERROR);
      }
    });
  }
  
});

const static = express.static('uploadFiles');

const routerFlowers = express.Router();
// 返回 flowers 的图片
routerFlowers.post('/get', (req, res, next) => {
  const { pwd } = req.body;
  if (pwd === flowerPwd) {
    StaticFile.findOne({key: 'flowers'}, (err, doc) => {
      if (err) {
        res.json(_C.CODE_ERROR);
      } else {
        if (doc && doc._id) {
          fs.exists(`${global.STATIC_FILE_RES_LOCAL}/${doc.filename}`, exists => {
            if (exists) {
              // 物理文件存在
              res.json({
                ..._C.CODE_SUCCESS,
                src: `
                  <p>更新时间：${doc.createTime}</p>
                  <img src="${global.STATIC_FILE_RES}/${doc.filename}" alt="flowers in bloom" title="flowers in bloom :)" />
                  `,
              });
            } else {
              // 库表有记录但无物理文件
              res.json({
                ..._C.CODE_SUCCESS,
                src: `<span style="color: red">未找到 Flowers！请联系管理员 :)</span>`,
              });
            }
          });
        } else {
          // 库表中找不到
          res.json(_C.CODE_FLOWERS_ERROR_NOT_FOUND);
        }
      }
    });
  } else {
    res.json(_C.CODE_FLOWERS_ERROR_PWD);
  }
});

// 试剂管理app store
const routerApp = express.Router();
// 获取列表（html用）
routerApp.post('/getAll', (req, res, next) => {
  const { pwd } = req.body;

  if (pwd === reagentAppPwd) {
    StaticFile.find({ key: 'reagentapp' }).sort({ createTime: -1}).exec((err, doc) => {
      if (err) res.json(_C.CODE_ERROR);
      else {
        let result = `
          <table>
            <thead>
              <tr>
                <th>文件名</th>
                <th>大小</th>
                <th>日期</th>
              </tr>
            </thead>
            <tbody>
        `;

        for (const item of doc) {
          result += `
            <tr>
              <th><a href="${global.STATIC_FILE_RES}/${item.filename}">${item.fileOriginalName}</a></th>
              <th>${item.fileSize}</th>
              <th>${moment(item.createTime).format('YYY-MM-DD HH:mm')}</th>
            </tr>
          `;
        }

        result += `
            </tbody>
          </table>
        `;

        res.json({
          ..._C.CODE_SUCCESS,
          src: result
        });

      }
    });

  } else {
    // 密码错误
    res.json(_C.CODE_ERROR_PWD);
  }

});

module.exports = {
  upup: router,
  static,
  routerFlowers,
  routerApp,
};
