const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const app = new express();
const server = require('http').Server(app);

require('./config');
const RouterArticle = require('./api/articles');
const RouterUser = require('./api/user');
const RouterStatistics = require('./api/statistics');
const RouterComments = require('./api/comments');
const RouterConfig = require('./api/config');
const RouterStaticFiles = require('./api/staticFiles');
const _U = require('./lib/utils');
const _C = require('./lib/constants');

const reagentAppToken = global.REAGENT_APP_TOEKN || '1';
const reagentAppAuth = global.REAGENT_APP_AUTH || '1';

const PORT = 9090;
const BASE_PATH = '/xpi';

// 日志文件路径
const logAccessPath = 'log/access';
const logErrorPath = 'log/error';

// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d',   // rotate daily
  path: _U.createFolder(logAccessPath),
});
const errorLogStream = rfs('error.log', {
  interval: '1d',
  path: _U.createFolder(logErrorPath),
});

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.NODE_ENV==='production'?global.DOMAIN:'*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Cache-Control');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(BASE_PATH+'/article', RouterArticle);
app.use(BASE_PATH+'/user', RouterUser);
app.use(BASE_PATH+'/statistics', RouterStatistics);
app.use(BASE_PATH+'/comments', RouterComments);
app.use(BASE_PATH+'/config', RouterConfig);
app.use(BASE_PATH+'/upload', RouterStaticFiles.upup);
app.use(BASE_PATH+'/static', (req, res, next) => {
    // appstore 需验证
    if (req.url.indexOf('/appstore') != -1) {
      const { token } = req.query;
      const auth = req.header('Auth');

      if (token===reagentAppToken && auth===reagentAppAuth) {
        next();
      } else {
        // 无权限
        res.status(403).send(_C.CODE_STATIC_NO_AUTH);
      }
      
    } else {
      res.setHeader('Content-Type', 'image/jpg, image/png');
      // 普通则无限制访问
      next();
    }

  }, RouterStaticFiles.static);
app.use(BASE_PATH+'/flowers', RouterStaticFiles.routerFlowers);
app.use(BASE_PATH+'/appstore', RouterStaticFiles.routerApp);

app.use(compression());   // 启用gzip压缩

// 错误日志
app.use((err, req, res, next) => {
  const meta = '[' + new Date() + '] ' + req.url + '\n' + 'from: ' + req.ip + '\n';
  errorLogStream.write(meta + err.stack + '\n');
  next();
  res.status(err.status || 500);
  res.json(_C.CODE_ERROR);
});

server.listen(PORT, () => {
  console.log(`Is started in ${server.address().address}:${PORT}`);
});
