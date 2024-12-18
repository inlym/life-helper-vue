import type {IdentityCertificate} from '@/api/login'
import dayjs from 'dayjs'
import {StorageKey} from './constant'

/** 获取身份证书 */
export function getIdentityCertificate(): IdentityCertificate | null {
  const result = localStorage.getItem(StorageKey.ACCESS_TOKEN)
  if (result) {
    const cert: IdentityCertificate = JSON.parse(result)

    // 判断是否已过期
    if (dayjs(cert.expireTime).isAfter(dayjs())) {
      // 未过期则可以使用，直接返回
      return cert
    } else {
      // 已过期则直接删除本地记录
      localStorage.removeItem(StorageKey.ACCESS_TOKEN)
    }
  }

  return null
}

/** 存储身份证书 */
export function saveIdentityCertificate(cert: IdentityCertificate) {
  localStorage.setItem(StorageKey.ACCESS_TOKEN, JSON.stringify(cert))
}

/** 判断是否已登录 */
export function isLogined(): boolean {
  return !!getIdentityCertificate()
}

/** 清除身份证书 */
export function clearIdentityCertificate() {
  localStorage.removeItem(StorageKey.ACCESS_TOKEN)
}
