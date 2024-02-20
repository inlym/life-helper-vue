import dayjs from 'dayjs'
import {StorageKey} from './storage'

/** 身份证书（登录后获取） */
export interface IdentityCertificate {
  /** 鉴权令牌 */
  token: string
  /** 鉴权令牌类型 */
  type: string
  /** 发起请求时，携带令牌的请求头名称 */
  headerName: string
  /** 创建时间 */
  createTime: string
  /** 过期时间 */
  expireTime: string
}

/** 获取身份证书 */
export function getIdentityCertificate(): IdentityCertificate | null {
  const str = localStorage.getItem(StorageKey.IdentityCertificate)
  if (str) {
    const cert = JSON.parse(str) as IdentityCertificate

    // 检查是否过期
    if (dayjs(cert.expireTime).isAfter(dayjs())) {
      return cert
    }
  }

  return null
}

/** 本地存储身份证书 */
export function saveIdentityCertificate(cert: IdentityCertificate): void {
  localStorage.setItem(StorageKey.IdentityCertificate, JSON.stringify(cert))
}

/** 检查是否已登录 */
export function isLogined(): boolean {
  return getIdentityCertificate() ? true : false
}
