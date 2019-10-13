const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const _C = require('./constants');

global.cs = (content, who, type='log') => {
  let w;
  switch (who) {
    case 'g':
      w = 'Generated';
      break;
    default:
      w = null;
  }
  console[type](`${type?'['+type+']!!!':''}${w?'['+w+']: ':''}${content}`);
}

/**
 * 产生随机整数，包含下限值，但不包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random (lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

function authtoken (req, res, next) {
  const token = req.body.token;
  if (token) {
    const cert = fs.readFileSync(path.resolve(__dirname, './jwt_pub.pem'));
    jwt.verify(token, cert, (err, decoded) =>  {
      // token失效
      if (err) {
        res.json({
          ..._C.CODE_PERMISSION_DENIED
        });
      // 放行
      } else {
        req.userinfo = decoded;
        next();
      }
    })
  // 未登陆
  } else {
    res.json({
      ..._C.CODE_NO_LOGIN
    });
  }
}

// 常用过滤器
filter = {
  __v: 0,
  _id: 0,
  lastModifiedTime: 0
}

module.exports = __ = {
  random,
  authtoken,
  filter,
}
