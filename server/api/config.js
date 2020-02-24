const express = require('express');
const Router = express.Router();
const Model = require('../db');
const Config = Model.getModel('configSchema');

const _C = require('../lib/constants');
const _U = require('../lib/utils');

Router.get('/get', (req, res) => {
  Config.find({}, {..._U.filter, remark: 0}, (err, doc) => {
    if (!err) {
      if (doc.length) {
        let resObj = {};
        doc.map(item => {
          if (item.val === 'false') resObj[item.name] = false;
          else if (item.val === 'true') resObj[item.name] = true;
          else resObj[item.name] = item.val;
        });
        return res.json({
          ..._C.CODE_SUCCESS,
          data: resObj
        });
      } else {
      // 无配置文件
        return res.json(_C.CODE_CONFIG_NO_DATA);
      }
    } else { return res.json(_C.CODE_ERROR) };
  })
});

Router.post('/save', _U.authtoken, (req, res) => {
  const obj = req.body;
  for(let key in obj) {
    Config.findOneAndUpdate({ name: key }, { val: obj[key] }, (err, doc) => {
      if (!err) {
        return res.json(_C.CODE_SUCCESS);
      } else {
        return res.json(_C.CODE_ERROR);
      }
    })
  }
});

module.exports = Router;
