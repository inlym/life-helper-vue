import {type AxiosHeaderValue, type InternalAxiosRequestConfig} from 'axios'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import md5 from 'crypto-js/md5'
import {paramsSerializer} from './paramsSerializer'

/**
 * 阿里云 API 网关签名拦截器
 * @see https://help.aliyun.com/document_detail/29475.html
 */
export function createAliyunApigwSignatureInterceptor(appKey: string, appSecret: string, debug = true) {
  return function aliyunApigwSignatureInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    /** 不参与 Header 签名计算的请求头字段 */
    const EXCLUDED_SIGNATURE_HEADERS = [
      'x-ca-signature',
      'x-ca-signature-headers',
      'accept',
      'content-md5',
      'content-type',
      'date',
    ]

    /** 换行符 */
    const LF = '\n'

    const headers = config.headers

    // 处理 `Accept`: 为空时赋个默认值
    headers.setAccept('*/*', false)

    // 处理 `Content-Type` 和 `Content-Md5`
    if (
      ['post', 'put', 'patch'].includes(config.method!.toLowerCase()) &&
      config.data !== undefined &&
      config.data !== null
    ) {
      if (typeof config.data === 'object') {
        if (config.data instanceof FormData) {
          throw new Error('暂不支持 FormData 形式的请求数据')
        } else {
          headers.setContentType('application/json')
          headers.set('content-md5', md5(JSON.stringify(config.data)).toString(Base64))
        }
      } else {
        // 保底策略
        headers.setContentType('text/plain')
        headers.set('content-md5', md5(String(config.data)).toString(Base64))
      }
    }

    // 添加认证需要的必要请求头
    headers.set('x-ca-key', appKey)
    headers.set('x-ca-nonce', md5(Date.now().toString() + Math.random() * 10000).toString(Hex))
    headers.set('x-ca-timestamp', Date.now().toString())
    headers.set('x-ca-signature-method', 'HmacSHA256')

    // 提取签名串
    const signedStrings: string[] = []
    const signedHeaders: string[] = []

    signedStrings.push(config.method!.toUpperCase())
    signedStrings.push(stringifyHeaderValue(headers.getAccept()))
    signedStrings.push(stringifyHeaderValue(headers.get('content-md5')))
    signedStrings.push(stringifyHeaderValue(headers.getContentType()))
    // 这一项取 Date 的值，由于不能编程对其赋值，直接特殊处理为空
    signedStrings.push('')

    Object.keys(headers)
      .map((key) => key.toLowerCase())
      .filter((key) => !EXCLUDED_SIGNATURE_HEADERS.includes(key) && !isForbiddenHeader(key))
      .sort()
      .forEach((key) => {
        signedStrings.push(key.toLowerCase() + ':' + headers.get(key))
        signedHeaders.push(key.toLowerCase())
      })

    // 计算路径参数
    const pathAndParameters = paramsSerializer(config.params)
      ? config.url + '?' + paramsSerializer(config.params)
      : config.url

    signedStrings.push(pathAndParameters!)

    headers.set('x-ca-signature-headers', signedHeaders.join(','))
    headers.set('x-ca-signature', hmacSHA256(signedStrings.join(LF), appSecret).toString(Base64))

    // 调试信息
    if (debug) {
      console.log(signedStrings.join('#'))
    }

    return config
  }
}

/** 判断是否是禁止修改的请求头 */
export function isForbiddenHeader(headerName: string): boolean {
  /** 禁止修改的请求头 */
  const FORBIDDEN_HEADERS = [
    'accept-charset',
    'accept-encoding',
    'access-control-request-headers',
    'access-control-request-method',
    'connection',
    'content-length',
    'cookie',
    'date',
    'dnt',
    'expect',
    'permissions-policy',
    'host',
    'keep-alive',
    'origin',
    'referer',
    'te',
    'trailer',
    'transfer-encoding',
    'upgrade',
    'via',
    'user-agent',
  ]

  return (
    FORBIDDEN_HEADERS.includes(headerName.toLowerCase()) ||
    headerName.toLowerCase().startsWith('proxy-') ||
    headerName.toLowerCase().startsWith('sec-')
  )
}

/** 将请求头的字段值转为字符串 */
export function stringifyHeaderValue(value: AxiosHeaderValue): string {
  /** 空字符串 */
  const EMPTY_STRING = ''

  if (typeof value === 'undefined' || value === null) {
    return EMPTY_STRING
  } else {
    return String(value)
  }
}
