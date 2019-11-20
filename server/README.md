# JXN个人博客的后端

## 开始
```bash
# clone the project
git clone https://github.com/yotcap/jxnblog.git
cd server

# install dependencies
npm i

# startup project
nodemon (or node)
```

## 线上Build模式
可在server根目录下新建`config.js`文件，用以配置数据库，生产时注意数据的安全。
```javascript
// config.js

global.USER = 'username';   // 用户名
global.PWD = 'password';    // 密码
global.DB = 'db_name';    // 数据库名
```

运行项目
```bash
node run build
```
