const express = require('express');
const jwt = require('jsonwebtoken');
const Router = express.Router();
const Model = require('../db/index');
const User = Model.getModel('userSchema');

const CODE = require('../lib/constants');

// add
Router.post('/add', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (err) throw err;
    // 用户已存在
    if (doc) {
      return res.json({ ...CODE.CODE_EXISTED_USER });
    } else {
      const user = new User({
        user,
        pwd,
        type: 'super_admin',
        remark: '超管',
        integral: 2333,
      });
      user.save((err, doc) => {
        if (err) throw err;
        if (doc) return res.json({ ...CODE.CODE_SUCCESS });
      });
    }
  });
  // const token = jwt.sign({

  // });
});

// login
Router.post('/login', (err, doc) => {
  const { user, pwd } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (err) throw err;
    // 未找到该用户
    if (!doc) {
      return res.json({ ...CODE.CODE_NO_USER });
    } else {

    }
  });
});

module.exports = Router;
