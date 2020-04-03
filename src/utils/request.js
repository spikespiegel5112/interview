import axios from 'axios'
import router from '../router/router'

import {
  Notification,
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store/store'
import {
  getToken
} from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000,
  withCredentials: true
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

let logedOutFlag = false
// 响应拦截器
service.interceptors.response.use(res => {
  // console.log('interceptors+++', res)
  // if (!res.data) {
  //   debugger
  //   return res
  // }
  let result
  const code = res.data ? res.data.code : undefined
  const hadnleLogout = () => {
    MessageBox.confirm(
      '登录状态已过期，您可以继续留在该页面，或者重新登录',
      '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  }
  const handleLogout2 = () => {
    MessageBox({
      title: '提示',
      message: '已退出登录，请重新登录',
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      type: 'prompt',
      showClose: false,
      closeOnPressEscape: false,
      closeOnClickModal: false,
      // showCancelButton: true,
      callback(action) {
        if (action === 'confirm') {
          // console.log(to.path)
          // debugger
          localStorage.removeItem('loginFlag')
          router.push({
            path: '/login'
          })
        }
      }
    })
  }

  switch (code) {
    case Number('-1'):
      return Promise.reject(res.data.msg)
      break
    case 99999:
      return Promise.reject(res.data.msg)
      break
    case 99998:
      // debugger
      result = res.data
      if (store.state.user.login) {
        store.commit('setLogin', false)
        handleLogout2()
      }
      break
    case 401:
      result = res.data
      if (store.state.user.login) {
        store.commit('setLogin', false)
        handleLogout2()
      }
      break
    case 0:
      result = res.data
      // if (store.state.user.login) {
      //   // logedOutFlag = true
      //   debugger

      //   store.commit('setLogin', false)
      //   handleLogout2()
      // }
      break
    default:
      result = res.data
  }
  return result
}, error => {
  console.log('err' + error)
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service

export const baseUrl = process.env.VUE_APP_BASE_API
