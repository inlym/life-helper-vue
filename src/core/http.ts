import {BusinessError} from '@/core/types'
import {Modal} from 'ant-design-vue'
import axios, {type AxiosRequestConfig} from 'axios'
import {useRequest, type Options, type Service} from 'vue-request'
import {createAliyunApigwSignatureInterceptor} from './axios/aliyunApigwSignatureInterceptor'
import {authInterceptor} from './axios/authInterceptor'
import {handleBusinessError} from './axios/handleBusinessError'
import {paramsSerializer} from './axios/paramsSerializer'

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
 * 发起数据请求
 *
 * ### 使用说明
 * 当前方法用于在页面层级注册 HTTP 请求
 */
export function useData<R, P extends unknown[] = any>(service: Service<R, P>, options?: Options<R, P>) {
  // 对 `options` 进行默认值处理
  if (options === undefined) {
    options = {}
  }
  if (options.manual === undefined) {
    options.manual = true
  }
  if (options.loadingDelay === undefined) {
    options.loadingDelay = 500
  }
  if (options.loadingKeep === undefined) {
    options.loadingKeep = 1000
  }
  // 发生错误时，自动弹窗提示
  if (options.onError === undefined) {
    options.onError = (error: Error) => {
      if (error instanceof BusinessError) {
        // 已经在 axios 拦截器中处理，将错误封装为了 `BusinessError`，因此发生错误一定会进入这一个分支
        if (!error.handled) {
          Modal.info({title: '提示', content: error.errorMessage, okText: '我知道了'})
        }
      }
    }
  }

  return useRequest<R, P>(service, options)
}
