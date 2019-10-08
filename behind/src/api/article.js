import Axios from '@/libs/api.request'

export const getArticleList = () => {
  return Axios.request({
    url: '/article/getList'
  })
}

export const addArticle = (data) => {
  return Axios.request({
    url: '/article/save',
    method: 'post',
    data
  })
}

export const getCategorylist = () => {
  return Axios.request({
    url: '/article/getOrderList',
    params: {
      type: 'category'
    }
  })
}
