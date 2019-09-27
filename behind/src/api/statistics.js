import axios from '@/libs/api.request'

export const getVisitors = () => {
  return axios.request({
    url: '/statistics/all'
  })
}
