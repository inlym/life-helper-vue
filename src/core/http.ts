import {BusinessError} from '@/core/model'
import {Modal} from 'ant-design-vue'
import axios, {type AxiosRequestConfig} from 'axios'
import type {JWK} from 'jose'
import {useRequest, type Options, type Service} from 'vue-request'
import {createAliyunApigwJwtAuthenticationInterceptor} from './axios/aliyunApigwJwtAuthenticationInterceptor'
import {createAliyunApigwSignatureInterceptor} from './axios/aliyunApigwSignatureInterceptor'
import {authInterceptor} from './axios/authInterceptor'
import {handleBusinessError} from './axios/handleBusinessError'
import {paramsSerializer} from './axios/paramsSerializer'
import {clientInfoInterceptor} from './axios/clientInfoInterceptor'

const jwk: JWK = JSON.parse(import.meta.env.ALIYUN_APIGW_JWT_KEYPAIR_JSON)

/** HTTP 请求客户端实例 */
export const instance = axios.create({
  baseURL: import.meta.env.REQUEST_BASE_URL,

  // HTTP 状态码校验，以下等同于不校验
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  },

  paramsSerializer,
})

// 添加请求拦截器（注意：请求拦截器先添加的后执行）
instance.interceptors.request.use(createAliyunApigwSignatureInterceptor(import.meta.env.ALIYUN_APP_KEY, import.meta.env.ALIYUN_APP_SECRET, false))
instance.interceptors.request.use(createAliyunApigwJwtAuthenticationInterceptor(jwk))
instance.interceptors.request.use(authInterceptor)
instance.interceptors.request.use(clientInfoInterceptor)

// 添加相应拦截器
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
