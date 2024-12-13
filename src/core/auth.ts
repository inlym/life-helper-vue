import dayjs from 'dayjs'
import {StorageKey} from './constant'

/** 身份证书 */
export interface IdentityCertificate {
  /** 鉴权令牌 */
  token: string
  /** 发起请求时，携带令牌的请求头名称 */
  headerName: string
  /** 创建时间 */
  createTime: string
  /** 过期时间 */
  expireTime: string
}

/** 获取身份证书 */
export function getIdentityCertificate(): IdentityCertificate | null {
  const result = localStorage.getItem(StorageKey.ACCESS_TOKEN)
  if (result) {
    const cert: IdentityCertificate = JSON.parse(result)

    // 判断是否已过期
    if (dayjs(cert.expireTime).isAfter(dayjs())) {
      return cert
    }
  }

  return null
}

/** 存储身份证书 */
export function saveIdentityCertificate(cert: IdentityCertificate) {
  localStorage.setItem(StorageKey.ACCESS_TOKEN, JSON.stringify(cert))
}

/**
 * 判断是否已登录
 */
export function isLogined(): boolean {
  return !!getIdentityCertificate()
}
