import {type InternalAxiosRequestConfig} from 'axios'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import md5 from 'crypto-js/md5'
import {paramsSerializer} from './paramsSerializer'

/** 空字符串 */
const EMPTY_STRING = ''

/** 换行符 */
const LF = '\n'

const DEFAULT_ACCEPT = '*/*'

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

    const headers = config.headers

    // 处理 `Accept`: 为空时赋个默认值
    headers.setAccept(DEFAULT_ACCEPT, false)

    // 处理 `Content-Type` 和 `Content-Md5`
    if (['post', 'put', 'patch'].includes(config.method!.toLowerCase()) && config.data !== undefined) {
      if (typeof config.data === 'object') {
        if (config.data instanceof FormData) {
          throw new Error('暂不支持 FormData 形式的请求数据')
        } else {
          headers.setContentType('application/json')
        }
      } else if (typeof config.data === 'string') {
        if (config.data.includes('=')) {
          headers.setContentType('application/x-www-form-urlencoded')
        } else {
          headers.setContentType('text/plain')
        }
      } else {
        // 保底策略
        headers.setContentType('text/plain')
      }

      headers.set('content-md5', md5(JSON.stringify(config.data)).toString(Base64))
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
    signedStrings.push(headers.getAccept() ? String(headers.getAccept()) : EMPTY_STRING)
    signedStrings.push(headers.get('content-md5') ? String(headers.get('content-md5')) : EMPTY_STRING)
    signedStrings.push(headers.getContentType() ? String(headers.getContentType()) : EMPTY_STRING)
    signedStrings.push(headers.get('date') ? String(headers.get('date')) : EMPTY_STRING)

    Object.keys(headers)
      .filter((key) => !EXCLUDED_SIGNATURE_HEADERS.includes(key.toLowerCase()))
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
