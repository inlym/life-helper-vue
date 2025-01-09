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

/** 单个数据项响应数据 */
export interface SingleNumberResponse extends ResponseData {
  num: number
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

/**
 * 已解决的错误
 *
 * ### 使用说明
 * 部分流程中，虽然已解决问题，但是只能抛出错误中断流程，此时抛出该错误。
 */
export class SolvedError extends Error {
  constructor(message: string) {
    super(message)
  }
}

/** 空函数，用于覆盖一些默认行为 */
export const EMPTY_FUNCTION = () => {}
