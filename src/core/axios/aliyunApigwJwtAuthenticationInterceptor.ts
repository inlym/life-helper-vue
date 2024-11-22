import type {InternalAxiosRequestConfig} from 'axios'
import dayjs from 'dayjs'
import {importJWK, SignJWT, type JWK} from 'jose'
import {nanoid} from 'nanoid'

/** 赋值的请求头 */
const HEADER_NAME = 'x-ca-apigw-jwt'

/**
 * 阿里云 API 网关 JWT 认证插件
 *
 * @see https://help.aliyun.com/zh/api-gateway/traditional-api-gateway/user-guide/jwt-authentication
 */
export function createAliyunApigwJwtAuthenticationInterceptor(jwk: JWK) {
  return async function aliyunApigwJwtAuthenticationInterceptor(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const alg = 'RS256'
    const privateKey = await importJWK(jwk, alg)

    /** JWT 签发方 */
    const iss = 'https://www.weutil.com'
    /** JWT 签发时间 */
    const iat = dayjs().unix()
    /** JWT 的过期时间: 10分钟 */
    const exp = dayjs().add(10, 'm').unix()
    /** JWT 主题 */
    const sub = 'apigw-jwt-authentication'
    /** JWT 唯一标识 */
    const jti = nanoid()

    // https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md
    const jwt = await new SignJWT()
      .setProtectedHeader({alg, kid: jwk.kid})
      .setIssuedAt(iat)
      .setIssuer(iss)
      .setExpirationTime(exp)
      .setSubject(sub)
      .setJti(jti)
      .sign(privateKey)

    config.headers.set(HEADER_NAME, jwt)

    return config
  }
}
