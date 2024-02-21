import {Method} from 'alova'
import {getIdentityCertificate} from '../auth'
import {getRandomString, hmacSHA256, md5} from '../utils'

// 阿里云[摘要签名认证](https://help.aliyun.com/zh/api-gateway/user-guide/use-digest-authentication-to-call-an-api)

const APPLICATION_JSON = 'application/json'
const LF = '\n'
const appKey = import.meta.env.VITE_ALIYUN_APP_KEY
const appSecret = import.meta.env.VITE_ALIYUN_APP_SECRET

export const requestInterceptor: (method: Method) => void | Promise<void> = (method) => {
  // 处理请求头，添加基础信息
  method.config.headers['accept'] = APPLICATION_JSON
  method.config.headers['content-type'] = APPLICATION_JSON
  method.config.headers['x-ca-key'] = appKey
  method.config.headers['x-ca-nonce'] = getRandomString()

  // 附带鉴权信息（若有）
  const cert = getIdentityCertificate()
  if (cert) {
    method.config.headers[cert.headerName] = cert.token
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
    method.config.headers['content-md5'] = contentMd5
  }

  // 构建签名使用的 Headers 字段（key需要按照字典排序）
  // 目前就加1个，后续再添加其他字段
  const headersStr = 'x-ca-nonce' + ':' + method.config.headers['x-ca-nonce']
  method.config.headers['x-ca-signature-headers'] = 'x-ca-nonce'

  const pathAndParameters =
    paramsPairList.length === 0 ? method.url : method.url + '?' + paramsPairList.join('&')

  const stringToSign =
    httpMethpd +
    LF +
    APPLICATION_JSON +
    LF +
    contentMd5 +
    LF +
    APPLICATION_JSON +
    LF +
    LF +
    headersStr +
    LF +
    pathAndParameters

  method.config.headers['x-ca-signature'] = hmacSHA256(stringToSign, appSecret)
}
