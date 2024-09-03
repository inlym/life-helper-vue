import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否需要登录 */
    requireAuth: boolean
  }
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** 是否需要权限 */
    requireAuth?: boolean
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

/** 业务错误 */
export class BusinessError extends Error {
  /** 错误码 */
  errorCode: number
  /** 错误消息 */
  errorMessage: string
  /** 是否已被处理 */
  handled: boolean

  constructor(data: CommonResponse) {
    super(data.errorMessage)

    this.errorCode = data.errorCode
    this.errorMessage = data.errorMessage
    this.handled = false
  }
}
