import type {InternalAxiosRequestConfig} from 'axios'
import dayjs from 'dayjs'
import {importJWK, SignJWT, type JWK} from 'jose'
import {nanoid} from 'nanoid'

/** 赋值的请求头 */
const HEADER_NAME = 'x-ca-apigw-jwt'

/**
 * 阿里云 API 网关 JWT 认证插件拦截器
 *
 * ### 拦截器说明
 * 生产环境使用了阿里云 API 网关的 JWT 认证插件，主要用途是提升攻击者伪造请求的难度，增加 API 的安全性。
 *
 * ### 使用说明
 * 1. 为每一个请求生成一个 JWT，即生成的 JWT 是一次性的，在网关层开启了针对 `jti` 的防重放检查。
 * 2. 密钥对 JWK 在 [mkjwk](https://mkjwk.org) 网站生成。
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
