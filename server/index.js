const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const app = new express();
const server = require('http').Server(app);
// const RouterArticle = express.Router();
const RouterArticle = require('./api/articles');

const PORT = 9090;
const BASE_PATH = '/xpi';
const logDirectory = path.join(__dirname, 'log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '1d',   // rotate daily
  path: logDirectory
});


app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(BASE_PATH+'/article', RouterArticle);
app.use(compression());   // 启用gzip压缩

server.listen(PORT, () => {
  console.log(`Is started in ${PORT}`);
});
