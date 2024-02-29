import {alovaInstance} from '@/core/http'

/** 获取扫码登录使用的资源 */
export function getQrCodeInfo() {
  return alovaInstance.Get<QrCodeInfo>('/login/qrcode')
}

/** 获取的二维码信息 */
export interface QrCodeInfo {
  /** 携带的 ID 参数 */
  id: string

  /** 图片资源的完整 URL 地址 */
  url: string
}
