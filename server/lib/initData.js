const Model = require('../db/index');
const Article = Model.getModel('articleSchema');
const Statistics = Model.getModel('statisticsSchema');
const Config = Model.getModel('configSchema');
const _U = require('./utils');

const isGenerateData = false;   // 是否制造一些假数据

const numArticleStart = 0;    // 文章开始id
const numArticleTotal = 120;    // 文章总数

// (() => {
  
//   generateStatistics().then(() => {
//     generateArticle().then(() => {
//       Model.close();
//     });
//   });

// })();

initDB();
if (isGenerateData) generateSomeData();

// 初始化数据库
async function initDB () {
  try {
    await initStatistics();
    await initConfig();
    if (!isGenerateData) Model.close();
  } catch (e) {
    if (!isGenerateData) Model.close();
    // console.log(e);
  }
}

// 制造一些假数据
async function generateSomeData () {
  try {
    await generateArticle();
    Model.close();
  } catch (e) {
    // console.log(e);
  }
}

// 初始化统计表
function initStatistics () {
  return new Promise((resolve, reject) => {
    Statistics.find({}, (err, doc) => {
      if (!err) {
        if (doc.length) {
          cs('db statistics is not empty', 'g', 'error');
          reject();
        // 初始化
        } else {
          let totleVisitor = new Statistics({
            name: 'totleVisitor',
            val: 0,
            remark: '总访问量'
          });
          totleVisitor.save((err, doc) => {
            if (!err) {
              // ...
              cs('statistics -- totleVisitor', 'g');
              resolve();
            }
          });
        }
      } else reject();
    });
  });
  
}

// 初始化设置表
function initConfig () {
  return new Promise((resolve, rejcet) => {
    Config.find({}, (err, doc) => {
      if (!err) {
        if (doc.length) {
          cs('db config is not empty', 'g', 'error');
          reject();
        } else {
          const flagComment = new Config({
            name: 'flagComment',
            val: 'true',
            remark: '是否开启评论功能'
          });
          flagComment.save((err, doc) => {
            if (!err) {
              cs('config -- flagComment', 'g');
              resolve();
            }
          });
        }
      } else rejcet();
    })
  })
}

// 批量生成文章
function generateArticle () {
  return new Promise((resolve, reject) => {
    Article.find((err, doc) => {
      if (!err) {
        if (doc) {
          cs('db article is not empty', 'g', 'error');
        // 生成
        } else {
          doit();
        }
      }
    });
    function doit () {
      let i = numArticleStart;
      const categoryList = ['js', 'css', 'html', 'vue', 'react', 'node', 'jquery', 'git', 'linux', 'db'];
      handler(i);
      function handler (i) {
        if (i<numArticleTotal) {
          const content = `# h1 \n --- \n \`\`\` javascript \n console.log(${i}); \n \`\`\``;
          const art = new Article({
            articleID: md5(content),
            title: `title${i}`,
            summary: `summarysummary${i}`,
            content,
            type: __.random(0, 1),
            category: categoryList[__.random(0, categoryList.length-1)],
            createTime: new Date('2010.'+__.random(1, 12)+'.01 13:22').getTime(),
          });
          art.save((err, doc) => {
            if (!err) handler(i+1);
            else reject();
          });
        } else {
          cs(`articles -- id from ${numArticleStart} -- totle ${numArticleTotal}`, 'g');
          resolve();
        }
      }
    }
  });  
}
