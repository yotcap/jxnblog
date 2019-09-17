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
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, reuqire: true },
    remark: { type: String },
    lastLogin: { type: String },
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
    tag: { type: Array },
    readingNum: { type: Number, default: 0 },
    commontNum: { type: Number, default: 0 },
    likeNum: { type: Number, default: 0 },
    lastModifiedTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now },
  },
  // article commonts
  commontsSchema: {
    articleID: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    content: { type: String, require: true },
    likeNum: { type: Number, default: 0 },
    createTime: { type: Date, default: Date.now }
  },
  // message board
  msgBoardSchema: {
    name: { type: String, require: true },
    email: { type: String, require: true },
    content: { type: String, reuqire: true },
    likeNum: { type: String, reuqire: true },
    createTime: { type: Date, default: Date.now }
  }
}

for (let m in modules) {
  mongoose.model(m, new mongoose.Schema(modules[m]));
}

module.exports = {
  getModel: name => {
    return mongoose.model(name);
  }
}