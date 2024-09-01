import type {IdentityCertificate} from '@/core/auth'
import {requestForData} from '@/core/http'

/**
 * 发送短信验证码
 *
 * @param phone 手机号
 *
 * @since 3.0.0
 * @date 2024.09.01
 */
export function sendSms(phone: string) {
  return requestForData<CheckTicket>({method: 'post', url: '/sms/login', data: {phone}, requireAuth: false})
}

/** 通过短信验证码登录 */
export function loginBySmsCode(checkTicket: string, code: string) {
  return requestForData<IdentityCertificate>({method: 'post', url: '/login/sms', data: {checkTicket, code}})
}

export interface CheckTicket {
  /** 校验码 */
  checkTicket: string
}
