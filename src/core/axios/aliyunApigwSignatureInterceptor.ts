import {AxiosHeaders, type InternalAxiosRequestConfig} from 'axios'
import {hmacSHA256ToBase64, md5ToBase64, md5ToHex} from './crypto'
import {paramsSerializer} from './paramsSerializer'

/** 空字符串 */
const EMPTY_STRING = ''

/** 换行符 */
const LF = '\n'

/**
 * 阿里云 API 网关签名拦截器
 * @see https://help.aliyun.com/document_detail/29475.html
 */
export function createAliyunApigwSignatureInterceptor(appKey: string, appSecret: string, debug = true) {
  return function aliyunApigwSignatureInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // 初始化请求头
    const oldHeaders = config.headers
    const newHeaders: Record<string, string> = {
      'accept': 'application/json',
      'content-type': 'application/json',
      'x-ca-nonce': md5ToHex(Date.now().toString() + Math.random() * 10000),
      'x-ca-timestamp': Date.now().toString(),
      'x-ca-key': appKey,
      'x-ca-signature-method': 'HmacSHA256',
    }

    Object.keys(oldHeaders).forEach((key) => {
      const value = oldHeaders[key]
      if (value) {
        // 请求头键名改为小写
        newHeaders[key.toLowerCase()] = value
      }
    })

    // 计算各个参与签名的对象值
    const httpMethod = config.method!.toUpperCase()
    const accept = newHeaders['accept']
    const contentMd5 = config.data ? md5ToBase64(JSON.stringify(config.data)) : EMPTY_STRING
    const contentType = newHeaders['content-type'] ? newHeaders['content-type'] : EMPTY_STRING
    const date = newHeaders['date'] ? newHeaders['date'] : EMPTY_STRING
    const pathAndParameters = paramsSerializer(config.params)
      ? config.url + '?' + paramsSerializer(config.params)
      : config.url

    const exceptionalHeaders = [
      'x-ca-signature',
      'x-ca-signature-headers',
      'accept',
      'content-md5',
      'content-type',
      'date',
    ]
    const signedStringList: string[] = [httpMethod, accept, contentMd5, contentType, date]
    const signedHeaderList: string[] = []

    Object.keys(newHeaders)
      .sort()
      .forEach((key) => {
        if (!exceptionalHeaders.includes(key)) {
          signedStringList.push(key + ':' + newHeaders[key])
          signedHeaderList.push(key)
        }
      })

    signedStringList.push(pathAndParameters!)

    const signature = hmacSHA256ToBase64(signedStringList.join(LF), appSecret)

    // 添加剩下的请求头
    newHeaders['content-md5'] = contentMd5
    newHeaders['x-ca-signature-headers'] = signedHeaderList.join(',')
    newHeaders['x-ca-signature'] = signature

    // 调试信息
    if (debug) {
      console.log(signedStringList.join('#'))
    }

    config.headers = new AxiosHeaders(newHeaders)

    return config
  }
}
