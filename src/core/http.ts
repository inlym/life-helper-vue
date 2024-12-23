import axios from 'axios'
import type {JWK} from 'jose'
import {createAliyunApigwJwtAuthenticationInterceptor} from './axios/aliyunApigwJwtAuthenticationInterceptor'
import {createAliyunApigwSignatureInterceptor} from './axios/aliyunApigwSignatureInterceptor'
import {authInterceptor} from './axios/authInterceptor'
import {clientInfoInterceptor} from './axios/clientInfoInterceptor'
import {debugSlowRequestInterceptor} from './axios/debugSlowRequestInterceptor'
import {handleBusinessError} from './axios/handleBusinessError'
import {paramsSerializer} from './axios/paramsSerializer'

const jwk: JWK = JSON.parse(import.meta.env.VITE_ALIYUN_APIGW_JWT_KEYPAIR_JSON)

/** HTTP 请求客户端实例 */
export const instance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,

  // HTTP 状态码校验，以下等同于不校验
  validateStatus: function (status: number): boolean {
    return status >= 200 && status <= 599
  },

  paramsSerializer,

  requireAuth: false,
})

// 添加请求拦截器（注意：请求拦截器先添加的后执行）
instance.interceptors.request.use(createAliyunApigwSignatureInterceptor(import.meta.env.VITE_ALIYUN_APP_KEY, import.meta.env.VITE_ALIYUN_APP_SECRET, false))
instance.interceptors.request.use(createAliyunApigwJwtAuthenticationInterceptor(jwk))
instance.interceptors.request.use(authInterceptor)
instance.interceptors.request.use(clientInfoInterceptor)
instance.interceptors.request.use(debugSlowRequestInterceptor)

// 添加相应拦截器
instance.interceptors.response.use(handleBusinessError)

// 以 `http` 变量名导出
export const http = instance

export interface RequestForDataOptions {
  /** 请求方法 */
  method: 'get' | 'post' | 'put' | 'delete'
  /** 请求路径 */
  url: string
  /** 请求参数 */
  params?: Record<string, string | number | boolean>
  /** 请求数据 */
  data?: any
  /** 是否需要权限 */
  requireAuth: boolean
}

/** 封装内部使用请求客户端 */
export async function requestForData<T = any>(config: RequestForDataOptions): Promise<T> {
  const response = await instance(config)
  return response.data
}
