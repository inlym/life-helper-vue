import {MD5} from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'

// 【阿里云网关签名拦截器说明】
// 1. 后端服务使用了阿里云网关并开启了摘要签名认证，当前拦截器封装该认证方式
// 2. 文档地址：https://help.aliyun.com/zh/api-gateway/user-guide/use-digest-authentication-to-call-an-api

/**
 * 以 base64 格式返回的 MD5 函数
 *
 * @param content 待处理文本
 */
export function md5(content: string): string {
  return MD5(content).toString(Base64)
}
