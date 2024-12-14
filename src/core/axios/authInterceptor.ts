import {router} from '@/router'
import type {InternalAxiosRequestConfig} from 'axios'
import {getIdentityCertificate} from '../auth'
import {Modal} from 'ant-design-vue'
import {SolvedError} from '../model'

/** 鉴权拦截器 */
export function authInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  // 能获取到就直接带上（不管 API 是否需要登录权限）
  const cert = getIdentityCertificate()
  if (cert) {
    config.headers.set(cert.headerName, cert.token)
  }

  if (!cert && config.requireAuth) {
    // 需要登录但未登录，则提示登录
    // 一般很少发生，因为在页面层级已经针对登录状态做出处理了
    Modal.confirm({
      title: '提示',
      content: '你当前未登录，登录后可继续操作',
      okText: '去登录',
      cancelText: '稍后再说',
      centered: true,
      onOk: () => {
        // 点击确定按钮，跳转登录页
        router.push({name: 'login'})
      },
    })

    // 抛出错误，暂停执行
    throw new SolvedError('未登录')
  }

  return config
}
