import Axios from '@/libs/api.request'

export const getDataConfig = () => {
  return Axios.request({
    url: '/config/get'
  })
}

export const saveConfig = (opt) => {
  return Axios.request({
    url: '/config/save',
    method: 'post',
    data: {
      ...opt
    }
  })
}
