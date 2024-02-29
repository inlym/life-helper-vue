import type {IdentityCertificate} from '@/core/auth'
import {alovaInstance} from '@/core/http'

/** 获取的二维码信息 */
export interface QrCodeInfo {
  /** 携带的 ID 参数 */
  id: string
  /** 图片资源的完整 URL 地址 */
  url: string
}

/** 登录结果 */
export interface LoginResult {
  /** 登录结果状态 */
  status: number
  /** 登录凭据 */
  certificate: IdentityCertificate
}

/** 获取扫码登录使用的资源 */
export const getQrCodeInfo = () => alovaInstance.Get<QrCodeInfo>('/login/qrcode')

/** 检查登录结果 */
export const checkLoginResult = (id: string) => alovaInstance.Post<LoginResult>('/login/qrcode', {id})
