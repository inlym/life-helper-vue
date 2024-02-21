import {Method} from 'alova'
import {getIdentityCertificate} from '../auth'
import {ContentType, HttpHeaders} from '../enums'
import {getRandomString, hmacSHA256, md5} from '../utils'

// 阿里云[摘要签名认证](https://help.aliyun.com/zh/api-gateway/user-guide/use-digest-authentication-to-call-an-api)

const LF = '\n'
const appKey = import.meta.env.VITE_ALIYUN_APP_KEY
const appSecret = import.meta.env.VITE_ALIYUN_APP_SECRET

export const requestInterceptor: (method: Method) => void | Promise<void> = (method) => {
  // 处理请求头，添加基础信息
  method.config.headers[HttpHeaders.ACCEPT] = ContentType.APPLICATION_JSON
  method.config.headers[HttpHeaders.CONTENT_TYPE] = ContentType.APPLICATION_JSON
  method.config.headers[HttpHeaders.X_CA_KEY] = appKey
  method.config.headers[HttpHeaders.X_CA_NONCE] = getRandomString()

  // 附带鉴权信息（若有）
  const cert = getIdentityCertificate()
  if (cert) {
    method.config.headers[HttpHeaders.AUTH_TOKEN] = cert.token
  }

  // 将 params 部分按字典排序，并转换为字符串格式
  const params = method.config.params as Record<string, any>
  const sortedParams: Record<string, string> = {}
  const paramsPairList: string[] = []
  Object.keys(params)
    .sort()
    .forEach((key) => {
      const value = params[key]
      const valueType = typeof value
      if (['string', 'boolean', 'number'].includes(valueType)) {
        sortedParams[key] = String(value)
        paramsPairList.push(key + '=' + String(value))
      }
    })

  method.config.params = sortedParams

  // 做签名准备
  const httpMethpd = method.type.toUpperCase()
  const contentMd5 = method.data ? md5(JSON.stringify(method.data)) : ''

  if (contentMd5) {
    method.config.headers[HttpHeaders.CONTENT_MD5] = contentMd5
  }

  // 构建签名使用的 Headers 字段（key需要按照字典排序）
  // 目前就加1个，后续再添加其他字段
  const headersStr = HttpHeaders.X_CA_NONCE + ':' + method.config.headers[HttpHeaders.X_CA_NONCE]
  method.config.headers[HttpHeaders.X_CA_SIGNATURE_HEADERS] = HttpHeaders.X_CA_NONCE

  const pathAndParameters =
    paramsPairList.length === 0 ? method.url : method.url + '?' + paramsPairList.join('&')

  const stringToSign =
    httpMethpd +
    LF +
    ContentType.APPLICATION_JSON +
    LF +
    contentMd5 +
    LF +
    ContentType.APPLICATION_JSON +
    LF +
    LF +
    headersStr +
    LF +
    pathAndParameters

  method.config.headers[HttpHeaders.X_CA_SIGNATURE] = hmacSHA256(stringToSign, appSecret)
}
