import type {InternalAxiosRequestConfig} from 'axios'

export const debugSlowRequest: boolean = JSON.parse(import.meta.env.VITE_DEBUG_SLOW_REQUEST)

/**
 * 调试慢请求拦截器
 *
 * @since 3.0.0
 * @date 2024/12/23
 */
export function debugSlowRequestInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  if (debugSlowRequest) {
    config.params = config.params || {}
    config.params.sleep = 5000
  }

  return config
}
