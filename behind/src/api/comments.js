import Axios from '@/libs/api.request'

export const getDataAllComments = () => {
  return Axios.request({
    url: '/comments/get',
    params: {
      type: 'all'
    }
  })
}
export const getDataUnreadComments = () => {
  return Axios.request({
    url: '/comments/get',
    params: {
      type: 'unread'
    }
  })
}
export const setIsRead = (data) => {
  return Axios.request({
    url: '/comments/isRead',
    method: 'post',
    data
  })
}

export const delComments = (data) => {
  return Axios.request({
    url: '/comments/del',
    method: 'post',
    data
  })
}
