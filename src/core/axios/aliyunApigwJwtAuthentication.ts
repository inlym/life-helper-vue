import type {InternalAxiosRequestConfig} from 'axios'
import {importJWK, SignJWT, type JWK} from 'jose'

/**
 * 阿里云 API 网关 JWT 认证插件
 *
 * @see https://help.aliyun.com/zh/api-gateway/traditional-api-gateway/user-guide/jwt-authentication
 */
export function createAliyunApigwJwtAuthentication(jwk: JWK) {
  return async function aliyunApigwJwtAuthentication(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const alg = 'RS256'
    const privateKey = await importJWK(jwk, alg)
    const headerName = 'x-weutil-apigw-jwt'

    const jti = Date.now().toString() + (Math.random() * 10000).toString()

    // https://github.com/panva/jose/blob/main/docs/jwt/sign/classes/SignJWT.md
    const jwt = await new SignJWT().setProtectedHeader({alg, kid: jwk.kid}).setIssuedAt().setIssuer('weutil.com').setJti(jti).sign(privateKey)

    config.headers.set(headerName, jwt)

    return config
  }
}
