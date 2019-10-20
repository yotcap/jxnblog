const express = require('express');
const Router = express.Router();
const Model = require('../db/index');
const Comments = Model.getModel('commentsSchema');
const Msg = Model.getModel('msgBoardSchema');
const Article = Model.getModel('articleSchema');
const Config = Model.getModel('configSchema');

const _C = require('../lib/constants');
const _U = require('../lib/utils');

const filterC = {
  likeNum: 0,
  articleID: 0,
  email: 0,
  __v: 0
}

// 新增留言/评论
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
              let num = doc.commentNum;
              com.save((err, doc) => {
                if (!err) {
                  // 更新当前文章的阅读数
                  Article.updateOne({ articleID: artID }, { $set: {commentNum: num+1} }, (err, doc) => {
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
  const { type, artID }=req.query;
  const sortCondition = { createTime: -1 };
  switch (type) {
    case 'article':     // 文章评论
      Comments.find({ articleID: artID }, {...filterC, isRead: 0}).sort(sortCondition).exec((err, doc) => {
        if (!err) {
          return res.json({
            ..._C.CODE_SUCCESS,
            data: doc
          });
        } else {
          return res.json(_C.CODE_ERROR);
        }
      });
      break;
    case 'msg':     // 留言板
      Msg.find({}, {...filter, isRead: 0}).sort(sortCondition).exec((err, doc) => {
        if (!err) {
          return res.json({
            ..._C.CODE_SUCCESS,
            data: doc
          });
        } else {
          return res.json(_C.CODE_ERROR);
        }
      });
      break;
    case 'unread':    // 未读消息（all）
      let cacheArr = [];
      getMsgUnread();
      async function getMsgUnread () {
        Comments.find({ isRead: false }, { __v: 0 }).sort(sortCondition).exec(async (err, doc) => {
          if (!err) {
            let cacheDoc = doc;
            // if (doc) {
            //   cacheDoc = doc.map(async item => {
            //     await Article.findOne({ articleID: item.articleID }, (err, doc) => {
            //       if (!err) {
            //         console.log(1)
            //         item.artTitle = doc.title;
            //       } else {
            //         console.error('[ERROR]get-article-title');
            //       }
            //     });
            //   })
            // }
            // console.log(2);
            cacheArr.push(...cacheDoc);
            Msg.find({ isRead: false }, filterC).sort(sortCondition).exec((err, doc) => {
              if (!err) {
                cacheArr.push(...doc);
                return res.json({
                  ..._C.CODE_SUCCESS,
                  data: cacheArr,
                });
              } else {
                return res.json(_C.CODE_ERROR);
              }
            })
          } else {
            console.log(err);
            return res.json(_C.CODE_ERROR);
          }
        });
      }
      break;
    case 'all':
      Comments.find({},  { __v: 0 }).sort(sortCondition).exec((err, doc) => {
        if (!err) {
          let cacheArr = doc;
          Msg.find({}, {__v:0}).sort(sortCondition).exec((err, doc1) => {
            if (!err) {
              cacheArr.push(...doc1);
              return res.json({
                ..._C.CODE_SUCCESS,
                data: cacheArr,
              });
            } else {
              return res.json(_C.CODE_ERROR);
            }
          });
        } else {
          return res.json(_C.CODE_ERROR);
        }
      })
      break;
    default:
      return res.json(_C.CODE_COMMENT_NO_TYPE);
  }
});

// 标为已读
Router.post('/isRead', _U.authtoken, (req, res) => {
  const { type, id } = req.body;
  if (type === 'msg') {
    Msg.findOneAndUpdate({ _id: id }, { isRead: true }, (err, doc) => {
      if (!err) return res.json(_C.CODE_SUCCESS);
      else return res.json(_C.CODE_ERROR);
    });
  } else if (type === 'comment') {
    Comments.findOneAndUpdate({ _id: id }, { isRead: true }, (err, doc) => {
      if (!err) return res.json(_C.CODE_SUCCESS);
      else return res.json(_C.CODE_ERROR);
    });
  }
});

// 删除评论
Router.post('/del', _U.authtoken, (req, res) => {
  const { type, id } = req.body;
  if (type === 'msg') {
    Msg.findOneAndDelete({ _id: id }, (err, doc) => {
      if (!err) return res.json(_C.CODE_SUCCESS);
      else return res.json(_C.CODE_ERROR);
    });
  } else if (type === 'comment') {
    Comments.findOneAndDelete({ _id: id }, (err, doc) => {
      if (!err) return res.json(_C.CODE_SUCCESS);
      else return res.json(_C.CODE_ERROR);
    });
  }
});

module.exports = Router;
