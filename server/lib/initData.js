const Model = require('../db/index');
const Article = Model.getModel('articleSchema');
const Statistics = Model.getModel('statisticsSchema');
const _U = require('./utils');

const numArticleStart = 0;    // 文章开始id
const numArticleTotal = 120;    // 文章总数

(() => {
  
  generateStatistics().then(() => {
    generateArticle().then(() => {
      Model.close();
    });
  });

})();

// 初始化统计表
function generateStatistics () {
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
