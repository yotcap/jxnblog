const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = new express();
const server = require('http').Server(app);
// const RouterArticle = express.Router();
const RouterArticle = require('./api/fe/articles');

const PORT = 9090;
const BASE_PATH = '/xpi';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(BASE_PATH+'/article', RouterArticle);

server.listen(PORT, () => {
  console.log(`Is started in ${PORT}`);
});
