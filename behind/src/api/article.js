import Axios from '@/libs/api.request'

export const getArticleList = () => {
  return Axios.request({
    url: '/article/getList'
  })
}
