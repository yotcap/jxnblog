const express = require('express');
const Router = express.Router();
const Model = require('../db/index');
const Comments = Model.getModel('commentsSchema');
const Msg = Model.getModel('msgBoardSchema');
const Article = Model.getModel('articleSchema');
const Config = Model.getModel('configSchema');

const _C = require('../lib/constants');
const __ = require('../lib/utils');

Router.post('/save', (req, res) => {
  const { artID, val } = req.body;
  Config.findOne({ name: 'flagComment' }, (err, doc) => {
    if (!err) {
      // 评论功能已关闭
      if (doc.val === 'false') return res.json(_C.CODE_PROHIBIT_COMMENTS);
      // 已开启评论功能
      // 文章留言
      if (artID) {
        const com = new Comments({
          articleID: artID,
          ...val,
          name: val.user,
        });
        Article.findOne({ articleID: artID }, (err, doc) => {
          if (!err) {
            if (doc) {
              let num = doc.commontNum;
              com.save((err, doc) => {
                if (!err) {
                  // 更新当前文章的阅读数
                  Article.updateOne({ articleID: artID }, { $set: {commontNum: num+1} }, (err, doc) => {
                    if (!err) {
                      return res.json(_C.CODE_SUCCESS);
                    } else {
                      return res.json(_C.CODE_ERROR);
                    }
                  });
                } else {
                  return res.json(_C.CODE_ERROR);
                }
              });
            } else {
              return res.json(_C.CODE_ARTICLE_NO_DATA);
            }
          } else {
            return res.json(_C.CODE_ERROR);
          }
        })
        
      } else {
      // 留言板
        const msg = new Msg({
          ...val,
          name: val.user
        });
        msg.save((err, doc) => {
          if (!err) {
            return res.json(_C.CODE_SUCCESS);
          } else {
            return res.json(_C.CODE_ERROR);
          }
        });
      }
    } else {
      return res.json(_C.CODE_ERROR);
    }
  });

  
});

Router.get('/get', (req, res) => {
  const { artID }=req.query, filter={__v:0, email: 0};
  // 文章评论
  if (artID) {
    Comments.find({ articleID: artID },filter, (err, doc) => {
      if (!err) {
        return res.json({
          ..._C.CODE_SUCCESS,
          data: doc
        });
      } else {
        return res.json(_C.CODE_ERROR);
      }
    });
  } else {
  // 留言板
    Msg.find({}, filter, (err, doc) => {
      if (!err) {
        return res.json({
          ..._C.CODE_SUCCESS,
          data: doc
        });
      } else {
        return res.json(_C.CODE_ERROR);
      }
    });
  }
});

module.exports = Router;
