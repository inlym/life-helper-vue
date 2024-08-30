import type {InternalAxiosRequestConfig} from 'axios'

/** 鉴权拦截器 */
export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  console.log(config.headers)

  return config
}
