const CODE_SUCCESS = { code: 1000, msg: 'its ok' };
const CODE_NO_DATA = { code: 1001, msg: '无数据' };
const CODE_ARTICLE_DATA_REPEATE = { code: 3001, msg: '文章已存在' };
const CODE_ERROR = { code: 5000, msg: '服务器错误' };

module.exports =  {
  CODE_SUCCESS,
  CODE_ARTICLE_DATA_REPEATE,
  CODE_ERROR,
  CODE_NO_DATA,
}
