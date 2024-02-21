import {HmacSHA256, MD5} from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'

/**
 * 以 base64 格式返回的 MD5 函数
 * @param content 待处理文本
 *
 * @version 1.0.0
 */
export function md5(content: string): string {
  return MD5(content).toString(Base64)
}

/**
 * 使用 HmacSHA256 加密文本
 *
 * @param message 消息文本
 * @param key 密钥
 *
 * @version 1.0.0
 */
export function hmacSHA256(message: string, key: string): string {
  return HmacSHA256(message, key).toString(Base64)
}

/**
 * 获取随机字符串
 *
 * ### 说明
 * 自建一个勉强能用的方法，避免引入 uuid 库体积太大
 *
 * @version 1.0.0
 */
export function getRandomString(): string {
  return MD5(Date.now().toString() + Math.random() * 100000).toString(Hex)
}
