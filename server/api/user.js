const fs = require('fs');
const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const Model = require('../db/index');
const User = Model.getModel('userSchema');

const _C = require('../lib/constants');
const _U = require('../lib/utils');

// add
Router.post('/add', (req, res) => {
  const { username, pwd } = req.body;
  User.findOne({ username }, (err, doc) => {
    if (err) throw err;
    // 用户已存在
    if (doc) {
      return res.json(_C.CODE_EXISTED_USER);
    } else {
      const user = new User({
        username,
        pwd,
        type: 'super_admin',
        remark: '超管',
        integral: 2333,
      });
      user.save((err, doc) => {
        if (err) throw err;
        if (doc) return res.json(_C.CODE_SUCCESS);
      });
    }
  });
  // const token = jwt.sign({

  // });
});

// login
Router.post('/login', (req, res) => {
  const { username, pwd } = req.body;
  User.findOne({ username }, (err, doc) => {
    if (err) throw err;
    // 未找到该用户
    if (!doc) {
      return res.json(_C.CODE_NO_USER);
    } else {
      if (pwd !== doc.pwd) return res.json(_C.CODE_ERROR_PWD);
      const cert = fs.readFileSync(path.resolve(__dirname, '../lib/jwt.pem'));
      const token = jwt.sign({
        user: doc.username,
        id: doc._id
      }, cert, {
        algorithm: 'RS256',
        expiresIn: '1h'
      });
      User.updateOne({ username }, { $set: { lastLogin: Date.now() }});
      return res.json({
        ..._C.CODE_SUCCESS,
        data: { token }
      });
    }
  });
});

// get user info
Router.post('/info', _U.authtoken, (req, res) => {
  const userinfo = req.userinfo;
  User.findOne({ username: userinfo.user }, (err, doc) => {
    if (err) throw err;
    if (!doc) {
      return res.json(_C.CODE_NO_USER);
    } else {
      return res.json({
        ..._C.CODE_SUCCESS,
        data: {
          name: doc.username,
          user_id: doc.username,
          access: [doc.type]
        }
      });
    }
  });
});

module.exports = Router;
