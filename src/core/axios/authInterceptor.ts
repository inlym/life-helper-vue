import {router} from '@/router'
import type {InternalAxiosRequestConfig} from 'axios'
import {getIdentityCertificate} from '../auth'

/** 鉴权拦截器 */
export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // 能获取到就直接带上（不管 API 是否需要登录权限）
  const cert = getIdentityCertificate()
  config.headers.set(cert?.headerName, cert?.token)

  if (!cert && config.requireAuth) {
    // 需要登录但未登录，则跳转登录页
    router.push({name: 'login'})
  }

  return config
}
