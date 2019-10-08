const express = require('express');
const md5 = require('js-md5');
const Router = express.Router();
const Model = require('../db/index');
const Article = Model.getModel('articleSchema');

const CODE = require('../lib/constants');
const __ = require('../lib/utils');

// Article.remove({}, (err, doc) => { console.log('--- reset Article db done!')});    // 格式化

// 查询列表
Router.get('/getList', (req, res) => {
  let { pageSize, page, condition, date, cate } = req.query;
  if (!pageSize) pageSize = 10;
  if (!page) page = 1;
  const shipNum = (page - 1) * pageSize;
  const sortCondition = { 'createTime': -1 };   // 排序规则
  const filter = {_id: 0, __v: 0, content: 0, lastModifiedTime: 0};
  let totalNum, searchCondition;
  // 关键字搜索
  if (condition && condition !== 'undefined') searchCondition = {$or: [{title: new RegExp(condition)}, {summary: new RegExp(condition)}, {content: new RegExp(condition)}]};
  // 类别
  else if (cate && cate !== 'undefined') searchCondition = { category: cate };
  // 日期📅
  else if (date && date !== 'undefined') {
    const cacheDate=date.split('-'), year=cacheDate[0], month=cacheDate[1];
    const days = new Date(year, month, 0).getDate();
    searchCondition = {
      createTime: {
        $gte: new Date(date+'-1'),
        $lt: new Date(date+'-'+days)
      }
    };
  }
  Article.find({...searchCondition}, (err, doc) => {
    if (!err) {
      totalNum = doc.length;
      Article.find({...searchCondition}, filter).skip(shipNum).limit(+pageSize).sort(sortCondition).exec((err, doc) => {
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
    }
  });
  
});

// 查询文章分类（已废弃）
Router.get('/getCategoryList', (req, res) => {
  Article.aggregate([
    {
      $group: {
        _id: { category: '$category' },
        total: { $sum: 1 }
      }
    },
    { $sort: { '_id.category': 1 } },
    {
      $project: { _id: 0, name: '$_id.category', total: 1 }
    },
  ]).then(result => {
    return res.json({
      ...CODE.CODE_SUCCESS,
      data: result
    });
  });
});

// 查询文章分类
Router.get('/getOrderList', (req, res) => {
  const type = req.query.type;
  // 按类型分类
  if (type === 'category') {
    Article.aggregate([
      {
        $group: {
          _id: { category: '$category' },
          total: { $sum: 1 }
        }
      },
      { $sort: { '_id.category': 1 } },
      {
        $project: { _id: 0, name: '$_id.category', total: 1 }
      },
    ]).then(result => {
      return res.json({
        ...CODE.CODE_SUCCESS,
        data: result
      });
    });
  // 按时间归档
  } else if (type === 'createTime') {
    Article.aggregate([
      { $project: { month: { $substr: ['$createTime', 0, 7] }, } },
      { $group: { _id: '$month', total: { $sum: 1 }, } },
      { $sort: { _id : -1 }, },
      { $project: { _id: 0, date: '$_id', total: 1 } }
    ]).then(result => {
      return res.json({
        ...CODE.CODE_SUCCESS,
        data: result,
      });
    })
  } else {

  }
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
      // 更新阅读数
      Article.updateOne({articleID}, {$set:{readingNum: ++doc.readingNum}}, () => {});
    }
  });

})

// 新增文章
Router.post('/save', (req, res) => {
  const { content, title, type, tags, category } = req.body;
  let { summary } = req.body;
  const cacheContent = md5(content);
  const articleID = 'art_' + cacheContent;
  Article.findOne({ articleID }, (err, doc) => {
    if (doc) {
      return res.json({ code: CODE.CODE_ARTICLE_DATA_REPEATE.code, msg: CODE.CODE_ARTICLE_DATA_REPEATE.msg });
    } else {
      let id = 'art_' + cacheContent;
      if (!summary) summary = content;
      const art = new Article({
        articleID: id,
        title,
        summary,
        content,
        type,
        lastModifiedTime: Date.now(),
        tags,
        category
      });
      art.save((err, doc) => {
        if (!err) {
          return res.json({ ...CODE.CODE_SUCCESS });
        }
      });
    }
  });
});

// 批量生成文章（已废弃）
Router.get('/saveSome', (req, res) => {
  let i = 99;
  const categoryList = ['js', 'css', 'html', 'vue', 'react', 'node', 'jquery', 'git', 'linux', 'db'];
  handler(i);
  function handler (i) {
    if (i<120) {
      let content = `# h1 \n --- \n \`\`\` javascript \n console.log(${i}); \n \`\`\``;
      let art = new Article({
        articleID: md5(content),
        title: `title${i}`,
        summary: `summarysummary${i}`,
        content,
        category: categoryList[__.random(0, categoryList.length-1)],
        createTime: new Date('2010.'+__.random(1, 12)+'.01 13:22').getTime(),
      });
      art.save((err, doc) => {
        if (!err) handler(i+1);
      });
    } else {
      return res.json({ code: CODE.CODE_SUCCESS.code, msg: CODE.CODE_SUCCESS.msg });
    }
  }
});

module.exports = Router;
