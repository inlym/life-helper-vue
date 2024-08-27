import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import hmacSHA256 from 'crypto-js/hmac-sha256'
import md5 from 'crypto-js/md5'

/** 以 Base64 格式输出 md5 的结果 */
export function md5ToBase64(content: string): string {
  return md5(content).toString(Base64)
}

/** 以 Hex 格式输出 md5 的结果 */
export function md5ToHex(content: string): string {
  return md5(content).toString(Hex)
}

/** 以 Base64 格式输出 hmac-sha256 的结果 */
export function hmacSHA256ToBase64(message: string, key: string): string {
  return hmacSHA256(message, key).toString(Base64)
}
