import type {InternalAxiosRequestConfig} from 'axios'
import {COMMIT_ID, COMMIT_NAME} from '../ci'

/**
 * 客户端信息拦截器
 *
 * @since 3.0.0
 * @date 2024/12/12
 */
export function clientInfoInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  config.headers.set('x-weutil-ci-commit', `name=${COMMIT_NAME}; id=${COMMIT_ID}`)
  config.headers.set('x-weutil-client-version', __APP_VERSION__)

  return config
}
