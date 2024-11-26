import type {IdentityCertificate} from '@/core/auth'
import {requestForData} from '@/core/http'
import {type ErrorResponse} from '@/core/model'

export interface CheckTicket {
  /** 校验码 */
  checkTicket: string
}

/** 短信发送速率超出限制异常响应数据 */
export interface SmsRateLimitExceededError extends ErrorResponse {
  remainingSeconds: number
}

/**
 * 发送短信验证码
 *
 * @param phone 手机号
 *
 * @since 3.0.0
 * @date 2024.09.01
 */
export function sendSms(phone: string) {
  return requestForData<CheckTicket>({
    method: 'post',
    url: '/sms/login',
    data: {phone},
    requireAuth: false,
  })
}

/**
 * 通过短信验证码登录
 *
 * @param checkTicket 校验码
 * @param code 6位数字短信验证码
 */
export function loginBySmsCode(checkTicket: string, code: string) {
  return requestForData<IdentityCertificate>({
    method: 'post',
    url: '/login/sms',
    data: {checkTicket, code},
    requireAuth: false,
  })
}
