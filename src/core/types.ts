import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否需要登录 */
    requireAuth: boolean
  }
}

/** 通用响应数据格式 */
export interface CommonResponse {
  /** 错误码 */
  errorCode: number
  /** 错误消息 */
  errorMessage: string
}

/** 通用单列表数据响应 */
export interface CommonListResponse<T> extends CommonResponse {
  list: T[]
}
