import axios from 'axios';
import { Message } from 'iview';
import { WORDS_NET_ERROR } from '@/lib/constants';

const conf = {
  // `url` is the server URL that will be used for the request
  url: '',
  // `method` is the request method to be used when making the request
  method: 'get', // default
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  // It can be convenient to set `baseURL` for an instance of axios to pass relative URLs
  // to methods of that instance.
  baseURL: '/xpi',
  // `transformRequest` allows changes to the request data before it is sent to the server
  // This is only applicable for request methods 'PUT', 'POST', 'PATCH' and 'DELETE'
  // The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
  // FormData or Stream
  // You may modify the headers object.
  transformRequest: [function (data, headers) {
    // Do whatever you want to transform the data
    return data;
  }],
  // `transformResponse` allows changes to the response data to be made before
  // it is passed to then/catch
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    return data;
  }],
  // `headers` are custom headers to be sent
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
  headers: {'Content-Type': 'application/json;charset=utf-8'},
  // headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000, // default is `0` (no timeout)
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default
  // `maxContentLength` defines the max size of the http response content in bytes allowed
  maxContentLength: 2000,
  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to `null`
  // or `undefined`), the promise will be resolved; otherwise, the promise will be
  // rejected.
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    if (response.data.code === 1000) {
      return response.data;
    } else {
      Message.error({
        content: response.data.msg,
        duration: 2,
      });
    }
  } else {
    Message.error({
      content: WORDS_NET_ERROR,
      duration: 2,
    });
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

let Axios = (opt) => {
  let data = opt.data;
  if (data) opt.data = JSON.stringify(data);
  return axios.request(Object.assign({}, conf, opt));
}

export default Axios;
