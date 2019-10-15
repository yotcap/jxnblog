const CODE_SUCCESS = { code: 1000, msg: 'its ok' };
const CODE_NO_DATA = { code: 1001, msg: '无数据' };
const CODE_NO_USER = { code: 1002, msg: '未找到该用户' };
const CODE_ERROR_PWD = { code: 1003, msg: '密码错误' };
const CODE_EXISTED_USER = { code: 1004, msg: '用户已存在' };
const CODE_NO_LOGIN = { code: 1005, msg: '请登陆' };
const CODE_PERMISSION_DENIED = { code: 1006, msg: '登陆失效，请重新登陆' };
const CODE_PROHIBIT_COMMENTS = { code: 1007, msg: '评论功能已关闭' };
const CODE_CONFIG_NO_DATA = { code: 1008, msg: '无配置文件' };
const CODE_ARTICLE_DATA_REPEATE = { code: 3001, msg: '文章已存在' };
const CODE_ARTICLE_NO_DATA = { code: 3002, msg: '文章不存在' };
const CODE_ERROR = { code: 5000, msg: '服务器错误' };

module.exports =  {
  CODE_SUCCESS,
  CODE_ARTICLE_DATA_REPEATE,
  CODE_ERROR,
  CODE_NO_DATA,
  CODE_NO_USER,
  CODE_ERROR_PWD,
  CODE_EXISTED_USER,
  CODE_NO_LOGIN,
  CODE_PERMISSION_DENIED,
  CODE_ARTICLE_NO_DATA,
  CODE_PROHIBIT_COMMENTS,
  CODE_CONFIG_NO_DATA,
}
