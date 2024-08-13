/** 身份证书 */
export interface IdentityCertificate {
  /** 鉴权令牌 */
  token: string
  /** 发起请求时，携带令牌的请求头名称 */
  headerName: string
  /** 创建时间 */
  createTime: string
  /** 过期时间 */
  expireTime: string
}
