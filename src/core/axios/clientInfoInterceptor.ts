import type {InternalAxiosRequestConfig} from 'axios'

/** 当前发布版本的 commit ID, 示例值: `d77a52188d8ba0668492bb0f4e8cbd02d470f3be` */
export const COMMIT_ID = import.meta.env.VITE_CI_COMMIT_SHA

/** 当前发布版本的分支名或标签名, 示例值: `master` 或 `1.0.0` */
export const COMMIT_NAME = import.meta.env.VITE_CI_COMMIT_REF_NAME

/**
 * 客户端信息拦截器
 *
 * @since 3.0.0
 * @date 2024/12/12
 */
export function clientInfoInterceptor(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
  const type = 'web'
  const id = window.location.hostname
  const version = __APP_VERSION__

  config.headers.set('x-weutil-client-info', `type=${type}; id=${id}; version=${version}`)
  config.headers.set('x-weutil-ci-commit', `name=${COMMIT_NAME}; id=${COMMIT_ID}`)

  return config
}
