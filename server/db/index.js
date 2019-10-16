const mongoose = require('mongoose');
const md5 = require('js-md5');
const DB_URL = 'mongodb://127.0.0.1:27018/jxblog';

mongoose.connection.openUri(DB_URL);
mongoose.connection.on('connected', () => {
  console.log(new Date(), 'connect db success!');

});

const modules = {
  // user
  userSchema: {
    username: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, reuqire: true },
    integral: { type: Number, default: 0 },
    remark: { type: String },
    lastLogin: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now }
  },
  // visitor
  visitorsSchema: {
    name: { type: String, require: true },
    email: { type: String },
    siteID: { type: String },
    githubID: { type: String },
  },
  // article
  articleSchema: {
    articleID: { type: String, reuqire: true },
    title: { type: String, require: true },
    summary: { type: String },
    content: { type: String, require: true },
    type: { type: Number, require: true },    // 文章类型：  0 原创    1 转载
    category: { type: String, require: true },    // 文章分类
    tags: { type: Array },   // 标签
    readingNum: { type: Number, default: 0 },
    commontNum: { type: Number, default: 0 },
    likeNum: { type: Number, default: 0 },
    lastModifiedTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now },
    remark: { type: String },
  },
  // article comments
  commentsSchema: {
    articleID: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    content: { type: String, require: true },
    isRead: { type: Boolean, default: false },
    likeNum: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now }
  },
  // reply schema
  replySchema: {
    commontID: { type: String, require: true },
    content: { type: String, require: true },
    createTime: { type: Date, default: Date.now }
  },
  // message board
  msgBoardSchema: {
    name: { type: String, require: true },
    email: { type: String, require: true },
    content: { type: String, reuqire: true },
    isRead: { type: Boolean, default: false },
    likeNum: { type: String, reuqire: true },
    createTime: { type: Date, default: Date.now }
  },
  // config file
  configSchema: {
    name: { type: String, require: true },
    val: { type: String, require: true },
    remark: { type: String }
  },
  // statistics file
  statisticsSchema: {
    name: { type: String, reuqire: true },
    val: { type: Number, default: 0 },
    remark: { type: String }
  }
}

for (let m in modules) {
  mongoose.model(m, new mongoose.Schema(modules[m]));
}

module.exports = {
  getModel: name => {
    return mongoose.model(name);
  },
  close: () => {
    mongoose.disconnect(() => {
      console.log('db already close');
    });
  }
}
