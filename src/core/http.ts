import axios, {type AxiosRequestConfig} from 'axios'
import {createAliyunApigwSignatureInterceptor} from './axios/aliyunApigwSignatureInterceptor'
import {authInterceptor} from './axios/authInterceptor'
import {paramsSerializer} from './axios/paramsSerializer'
import {handleBusinessError} from './axios/handleBusinessError'
import {BusinessError} from '@/core/types'
import {Modal} from 'ant-design-vue'

const appKey = import.meta.env.VITE_ALIYUN_APP_KEY
const appSecret = import.meta.env.VITE_ALIYUN_APP_SECRET

/** HTTP 请求客户端实例 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,

  // HTTP 状态码校验，以下等同于不校验
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  },

  paramsSerializer,
})

instance.interceptors.request.use(authInterceptor)
instance.interceptors.request.use(createAliyunApigwSignatureInterceptor(appKey, appSecret, false))
instance.interceptors.response.use(handleBusinessError)

// 以 `http` 变量名导出
export const http = instance

/** 封装内部使用请求客户端 */
export async function requestForData<T = any>(config: AxiosRequestConfig): Promise<T> {
  const response = await instance(config)
  return response.data
}

/**
 * 通用错误处理器（在 VueRequest 中使用）
 *
 * ### 说明
 * 为使函数名简单，采用同名方法
 */
export function onHttpError(error: Error) {
  if (error instanceof BusinessError) {
    // 已经在 axios 拦截器中处理，将错误封装为了 `BusinessError`，因此发生错误一定会进入这一个分支
    if (!error.handled) {
      Modal.info({title: '提示', content: error.errorMessage, okText: '我知道了'})
    }
  }
}
