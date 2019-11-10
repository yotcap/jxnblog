const fs = require('fs');
const express = require('express');
const multer = require('multer');

const router = express.Router();
const _U = require('../lib/utils');
const _C = require('../lib/constants');

const filePath = './uploadFiles/';

// 磁盘存储引擎可以让你控制文件的存储
// 有两个选项可用，destination 和 filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadFiles/');
  },
  filename: (req, file, cb) => {
    // 保存的文件名为   [时间戳]-[原始文件名]
    cb(null, Date.now() + '-' + file.originalname);
  },
});

_U.createFolder(filePath);
const upload = multer({ storage });

router.post('/up', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.mimetype, '-文件类型');
  console.log(file.originalname, '-文件名');
  console.log(file.size, '-大小');
  console.log(file.path, '-保存路径');
  res.json({
    ..._C.CODE_SUCCESS,
    msg: '上传成功'
  });
});

const static =  express.static('uploadFiles');

module.exports = {
  upup: router,
  static,
};
