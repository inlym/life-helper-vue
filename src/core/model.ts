/** 响应数据 */
export interface ResponseData {
  // [说明]
  // 只有发生错误时，才会包含以下2个字段，否则只有正常的响应数据内容

  /** 错误码 */
  errorCode: number
  /** 错误消息 */
  errorMessage: string
}

/** 通用响应数据格式 */
export interface CommonResponse extends ResponseData {
  [key: string]: any
}

/** 通用单列表数据响应 */
export interface CommonListResponse<T> extends ResponseData {
  list: T[]
}

/** 业务错误 */
export class BusinessError extends Error {
  /** 错误码 */
  errorCode: number

  /** 错误消息 */
  errorMessage: string

  constructor(data: CommonResponse) {
    super(`错误码: ${data.errorCode}, 错误消息: ${data.errorMessage}`)

    this.errorCode = data.errorCode
    this.errorMessage = data.errorMessage
  }
}
