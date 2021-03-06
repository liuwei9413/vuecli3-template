import Vue from 'vue'
import axios from 'axios'
// import qs from 'qs'
import { Message } from 'element-ui'
import { removeStorage } from '@/util'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true

// 动态配置接口域名
if (process.env.NODE_ENV === 'production') {
  Vue.prototype.baseURL = '/'
  axios.defaults.baseURL = '/'
} else {
  Vue.prototype.baseURL = 'https://innovation-manage-test.vechaindev.com/'
  axios.defaults.baseURL = ''
}

axios.interceptors.request.use((config) => {
  config.params = config.params
    ? config.params
    : {}
  return config
}, (error) => {
  console.log('参数错误')
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    let result = res.data
    if (result && result.code === 1) {
      return Promise.resolve(res)
    }
  },
  error => {
    const response = error.response
    if (response && Object.prototype.toString.call(response.data) === '[object Object]') {
      if (response.data.code === 10002) {
        removeStorage('userInfo')
        location.href = '/#/login'
      } else {
        Message.error(response.data.message)
      }
    } else {
      Message.error(`${error.message}`)
    }
    return Promise.reject(error)
  }
)

export function fetch(url, type, params) {
  if (type === 'get') {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        })
    })
  } else if (type === 'post') {
    return new Promise((resolve, reject) => {
      if (!params) {
        axios.post(url)
          .then(response => {
            resolve(response.data)
          }, err => {
            reject(err)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        axios.post(url, params)
          .then(response => {
            resolve(response.data)
          }, err => {
            reject(err)
          })
          .catch((error) => {
            reject(error)
          })
      }      
    })
  }
}
