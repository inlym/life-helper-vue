import {type AxiosResponse} from 'axios'
import {BusinessError, type CommonResponse} from '../types'

/** 封装处理业务错误 */
export function handleBusinessError(response: AxiosResponse<CommonResponse>): AxiosResponse {
  const data = response.data
  if (data.errorCode && data.errorCode > 0) {
    throw new BusinessError(data)
  }

  return response
}
