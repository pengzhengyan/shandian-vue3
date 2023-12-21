/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

import axios from "axios"
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
// import router from '@/router'
import { ElMessage } from 'element-plus'
// 处理loading
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loadingHandler'

const baseURL = 'http://129.204.228.108'

// axios实例
const service = axios.create({})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  showFullScreenLoading()
  // 1.拼接请求URL
  if (!config.url?.startsWith('http')) {
    config.url = baseURL + config.url
  }
  // 2.请求超时
  config.timeout = 5000

  // 3.设置Content-Type
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

  // 4. 添加 token 请求头标识
  // const memberStore = useMemberStore()
  // const token = memberStore.profile?.token
  const token = 'bear'
  if (token) {
    config.headers.Authorization = token
  }

  return config;
}, function (error) {
  tryHideFullScreenLoading()
  // 对请求错误做些什么
  ElMessage.error(error)
  return Promise.reject(error);
})

/* 响应拦截器 */
service.interceptors.response.use((response: AxiosResponse) => {
  tryHideFullScreenLoading()
  const { code, msg } = response.data

  // 根据自定义错误码判断请求是否成功
  if (code === '0') {
    // 将组件用的数据返回
    return response.data
  } else {
    // 处理业务错误。
    ElMessage.error(msg)
    // return Promise.reject(new Error(msg))
  }
}, (error: AxiosError) => {
  tryHideFullScreenLoading()
  // 处理 HTTP 网络错误
  let msg = ''
  // HTTP 状态码
  const status = error.response?.status
  switch (status) {
    case 401:
      msg = 'token 失效，请重新登录'
      // 这里可以触发退出的 action
      break;
    case 403:
      msg = '拒绝访问'
      break;
    case 404:
      msg = '请求地址错误'
      break;
    case 500:
      msg = '服务器故障'
      break;
    default:
      msg = '网络连接故障'
  }

  ElMessage.error(msg)
  return Promise.reject(error)
})


/* 导出封装的请求方法 */
const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config)
  }
}

export default http