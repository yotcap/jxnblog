const express = require('express');
const Router = express.Router();
const Model = require('../db/index');
const Comments = Model.getModel('commentsSchema');
const Article = Model.getModel('articleSchema');

const CODE = require('../lib/constants');
const __ = require('../lib/utils');

Router.post('/save', (req, res) => {
  const { artID, val } = req.body;
  // 文章留言
  if (artID) {
    const com = new Comments({
      articleID: artID,
      ...val,
      name: val.user,
    })
    Article.findOne({ articleID: artID }, (err, doc) => {
      if (!err) {
        if (doc) {
          let num = doc.commontNum;
          com.save((err, doc) => {
            if (!err) {
              // 更新当前文章的阅读数
              Article.updateOne({ articleID: artID }, { $set: {commontNum: num+1} }, (err, doc) => {
                if (!err) {
                  return res.json({...CODE.CODE_SUCCESS});
                } else {
                  return res.json({...CODE.CODE_ERROR});
                }
              });
            } else {
              return res.json({...CODE.CODE_ERROR});
            }
          });
        } else {
          return res.json({ ...CODE.CODE_ARTICLE_NO_DATA });
        }
      } else {
        return res.json({ ...CODE.CODE_ERROR });
      }
    })
    
  } else {
  // 留言板

  }
  
});

Router.get('/get', (req, res) => {
  const { artID } = req.query;
  // 文章评论
  if (artID) {
    Comments.find({ articleID: artID }, { __v: 0, lastModifiedTime: 0, email: 0 }, (err, doc) => {
      if (!err) {
        return res.json({
          ...CODE.CODE_SUCCESS,
          data: doc
        });
      } else {
        return res.json({ ...CODE.CODE_ERROR });
      }
    });
  } else {
  // 留言板
  
  }
})

module.exports = Router;
