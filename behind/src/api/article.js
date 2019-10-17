import Axios from '@/libs/api.request'

export const getArticleDetail = (params) => {
  return Axios.request({
    url: '/article/getDetail',
    params
  })
}

export const getArticleList = (params) => {
  return Axios.request({
    url: '/article/getList',
    params
  })
}

export const addArticle = (data) => {
  return Axios.request({
    url: '/article/save',
    method: 'post',
    data
  })
}

export const updateArticle = (data) => {
  return Axios.request({
    url: '/article/update',
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

export const delArticle = (data) => {
  return Axios.request({
    url: '/article/del',
    method: 'post',
    data
  })
}
