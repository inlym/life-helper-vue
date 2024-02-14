import type {AxiosRequestConfig} from 'axios'
import {HmacSHA256, MD5} from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'

// 【阿里云网关签名拦截器说明】
// 1. 后端服务使用了阿里云网关并开启了摘要签名认证，当前拦截器封装该认证方式
// 2. 文档地址：https://help.aliyun.com/zh/api-gateway/user-guide/use-digest-authentication-to-call-an-api

/**
 * 以 base64 格式返回的 MD5 函数
 * @param content 待处理文本
 */
export function md5(content: string): string {
  return MD5(content).toString(Base64)
}

export function encodeParams(obj?: Record<string, string | number | boolean>): string {
  if (obj === null || obj === undefined) {
    return ''
  }

  const parts: string[] = []
  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    if (typeof value !== 'undefined' && value !== null && value !== '') {
      parts.push(`${key}=${String(value)}`)
    }
  })

  parts.sort()
  return parts.join('&')
}

/**
 * 计算签名
 * @param stringToSign 签名串
 * @param secret 即 APP Secret
 */
export function sign(stringToSign: string, secret: string): string {
  return HmacSHA256(stringToSign, secret).toString(Base64)
}

/**
 * 获取请求地址的路径及参数部分
 * @param url 完整的请求地址
 */
export function getPathAndParams(url: string): string {
  const urlRaw = url.replace('https://', '').replace('http://', '')
  return urlRaw.substring(urlRaw.indexOf('/'))
}

/**
 * 规格化请求头
 *
 * [说明]
 * 1. 将字段名统一变为小写
 * 2. 去除重复的请求头
 * @param {Record<string, string>} headers 请求头
 */
export function normalizeHeaders(headers: Record<string, string>): Record<string, string> {
  if (typeof headers !== 'object') {
    return {}
  }

  /** 放在 `config.headers` 中但是非正常请求头字段的字段 */
  const axiosExtraHeaderFieldList = ['common', 'delete', 'get', 'head', 'patch', 'post', 'put']
  const result: Record<string, string> = {}

  Object.keys(headers).forEach((name: string) => {
    const lowerName = name.toLowerCase()
    if (!result[lowerName] && headers[name] && !axiosExtraHeaderFieldList.includes(name)) {
      result[lowerName] = headers[name]
    }
  })

  return result
}

/**
 * 获取参与签名的请求头列表
 * @param {Record<string, string>} headers 请求头
 */
export function getSignHeaderKeys(headers: Record<string, string>): string[] {
  /** 不参与 Header 签名的请求头 */
  const EXCLUDE_SIGN_HEADERS = [
    'x-ca-signature',
    'x-xa-signature-headers',
    'accept',
    'content-md5',
    'content-type',
    'date'
  ]

  return Object.keys(headers)
    .filter((name: string) => {
      return !EXCLUDE_SIGN_HEADERS.includes(name)
    })
    .sort()
}

export function getSignedHeadersString(
  signHeaderKeys: string[],
  headers: Record<string, string>
): string {
  return signHeaderKeys
    .map((key: string) => {
      const value = headers[key]
      return key + ':' + (value ? value : '')
    })
    .join('\n')
}

/**
 * 提取签名串
 * @param method 请求方法
 * @param headers 请求头
 * @param signedHeadersString
 * @param pathAndParams 请求路径及参数
 */
export function buildStringToSign(
  method: string,
  headers: Record<string, string>,
  signedHeadersString: string,
  pathAndParams: string
) {
  const lf = '\n'
  const list: string[] = [method.toUpperCase(), lf]

  const arr = ['accept', 'content-md5', 'content-type', 'date']
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i]
    if (headers[key]) {
      list.push(headers[key])
    }
    list.push(lf)
  }

  if (signedHeadersString) {
    list.push(signedHeadersString)
    list.push(lf)
  }

  if (pathAndParams) {
    list.push(pathAndParams)
  }

  return list.join('')
}

/**
 * 构建阿里云 API 网关签名拦截器
 * @param appKey APP Key
 * @param appSecret APP Secret
 * @param debug 是否开启调试
 */
export function aliyunApigwSignatureInterceptorBuilder(
  appKey: string,
  appSecret: string,
  debug = true
) {
  return function aliyunApigwSignatureInterceptor(config: AxiosRequestConfig): AxiosRequestConfig {
    const headers = normalizeHeaders(config.headers as Record<string, string>)

    // 给请求头添加一些要求添加的字段
    headers['x-ca-key'] = appKey
    headers['x-ca-timestamp'] = Date.now().toString()
    headers['accept'] = headers['accept'] || '*/*'
    headers['content-type'] = headers['content-type'] || 'application/json'

    // 该请求头要求为一个随机字符串，理论上使用 `UUID` 更好，为了少引入依赖，使用这种方法
    headers['x-ca-nonce'] = MD5(Date.now().toString() + Math.random() * 10000).toString(Hex)

    if (config.data) {
      headers['content-md5'] = md5(JSON.stringify(config.data))
    }

    const signHeaderKeys = getSignHeaderKeys(headers)
    headers['x-ca-signature-headers'] = signHeaderKeys.join(',')

    const querystring = encodeParams(config.params)
    const wholeUrl =
      (config.baseURL || '') + (config.url || '') + (querystring ? '?' + querystring : '')
    const pathAndParams = getPathAndParams(wholeUrl)
    const signedHeadersString = getSignedHeadersString(signHeaderKeys, headers)
    const stringToSign = buildStringToSign(
      config.method!.toUpperCase(),
      headers,
      signedHeadersString,
      pathAndParams
    )
    headers['x-ca-signature'] = sign(stringToSign, appSecret)

    if (debug) {
      console.info(`当前签名字符串：\`${stringToSign.replace(/\n/g, '#')}\``)
    }

    config.headers = headers
    return config
  }
}
