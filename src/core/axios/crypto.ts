import * as CryptoJS from 'crypto-js'

/** 以 Base64 格式输出 md5 的结果 */
export function md5ToBase64(content: string): string {
  return CryptoJS.MD5(content).toString(CryptoJS.enc.Base64)
}

/** 以 Hex 格式输出 md5 的结果 */
export function md5ToHex(content: string): string {
  return CryptoJS.MD5(content).toString(CryptoJS.enc.Hex)
}

export function hmacSHA256ToBase64(message: string, key: string): string {
  return CryptoJS.HmacSHA256(message, key).toString(CryptoJS.enc.Base64)
}
