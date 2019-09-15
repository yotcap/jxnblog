const express = require('express');
const Router = express.Router();

Router.get('/getList', (req, res) => {
  console.log(req, 'req');
  return res.json({
    code: 1000,
    msg: 'its ok'
  });
})
module.exports = Router;
