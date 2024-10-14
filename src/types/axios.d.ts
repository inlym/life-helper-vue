import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 是否需要权限 */
    requireAuth?: boolean
  }
}
