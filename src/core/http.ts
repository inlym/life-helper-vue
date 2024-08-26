import axios from 'axios'
import { paramsSerializer } from './axios/paramsSerializer'
import { authInterceptor } from './axios/authInterceptor'
import { aliyunApigwSignatureInterceptorBuilder } from './axios/aliyunApigwSignatureInterceptorBuilder'

const appKey = import.meta.env.VITE_ALIYUN_APP_KEY
const appSecret = import.meta.env.VITE_ALIYUN_APP_SECRET

/** HTTP 请求客户端实例 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,

  // HTTP 状态码校验，以下等同于不校验
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  },

  paramsSerializer
})

instance.interceptors.request.use(authInterceptor)
instance.interceptors.request.use(aliyunApigwSignatureInterceptorBuilder(appKey, appSecret, true))

// 以 `http` 变量名导出
export const http = instance
