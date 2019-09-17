const express = require('express');
const md5 = require('js-md5');
const Router = express.Router();
const Model = require('../db/index');
const Article = Model.getModel('articleSchema');

const CODE = require('../lib/constants');

// Article.remove({}, (err, doc) => {});    // 格式化

// 查询列表
Router.get('/getList', (req, res) => {
  const { pageSize, page, condition } = req.query;
  const shipNum = (page - 1) * pageSize;
  const sortCondition = { 'createTime': -1 };   // 排序规则
  const filter = {_id: 0, __v: 0, content: 0, lastModifiedTime: 0};
  let totalNum;
  Article.find({}, (err, doc) => {
    if (!err) {
      totalNum = doc.length;
    }
  });
  Article.find({}, filter).skip(shipNum).limit(+pageSize).sort(sortCondition).exec((err, doc) => {
    if (!err) {
      return res.json({
        code: CODE.CODE_SUCCESS.code,
        data: {
          articleList: doc,
          totalNum,
          page: +page,
          pageSize: +pageSize,
        },
        msg: CODE.CODE_SUCCESS.msg
      });
    } else {
      return res.json({
        code: CODE.CODE_ERROR.code,
        msg: CODE.CODE_ERROR.msg
      });
    }
  });
});

// 获取文章详情
Router.get('/getDetail', (req, res) => {
  const { articleID } = req.query;
  const filter = { __v: 0, _id: 0, lastModifiedTime: 0 };
  Article.findOne({articleID}, filter, (err, doc) => {
    if (!err) {
      if (!doc) {
        res.json({
          code: CODE.CODE_NO_DATA.code,
          msg: CODE.CODE_NO_DATA.msg
        });
      } else {
        res.json({
          code: CODE.CODE_SUCCESS.code,
          msg: CODE.CODE_SUCCESS.msg,
          data: doc
        });
      }
    }
  })
})

// 新增文章
Router.post('/save', (req, res) => {
  const { content, title, summary } = req.body;
  const cacheContent = md5(content);
  const articleID = 'art_' + cacheContent;
  Article.findOne({ articleID }, (err, doc) => {
    if (doc) {
      return res.json({ code: CODE.CODE_ARTICLE_DATA_REPEATE.code, msg: CODE.CODE_ARTICLE_DATA_REPEATE.msg });
    } else {
      let id = 'art_' + cacheContent;
      const art = new Article({
        articleID: id,
        title,
        summary,
        content
      });
      art.save((err, doc) => {
        if (!err) {
          return res.json({ code: CODE.CODE_SUCCESS.code, msg: CODE.CODE_SUCCESS.msg });
        }
      });
    }
  });
});

module.exports = Router;
