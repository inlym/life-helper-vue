import {requestForData} from '@/core/http'
import {type ResponseData} from '@/core/model'

/** 短信发送速率超出限制异常响应数据 */
export interface SmsRateLimitExceededResponse extends ResponseData {
  /** 剩余的等待秒数 */
  remainingSeconds: number
}

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

/**
 * 发送短信验证码
 *
 * @param phone 手机号
 * @param captchaVerifyParam 验证码校验参数
 *
 * @since 3.0.0
 * @date 2024.09.01
 */
export function sendSms(phone: string, captchaVerifyParam: string) {
  return requestForData({
    method: 'post',
    url: '/sms/login',
    data: {phone, captchaVerifyParam},
    requireAuth: false,
  })
}

/**
 * 通过短信验证码登录
 *
 * @param phone 手机号
 * @param code 6位数字短信验证码
 */
export function loginBySmsCode(phone: string, code: string) {
  return requestForData<IdentityCertificate>({
    method: 'post',
    url: '/login/sms',
    data: {phone, code},
    requireAuth: false,
  })
}
