import {router} from '@/router'
import {Modal} from 'ant-design-vue'
import {type AxiosResponse} from 'axios'
import {logger} from '../logger'
import {BusinessError, SolvedError, type CommonResponse} from '../model'
import {useAuthStore} from '@/stores/auth'
import {clearIdentityCertificate} from '../auth'

/** 封装处理业务错误 */
export function handleBusinessError(response: AxiosResponse<CommonResponse>): AxiosResponse {
  const data = response.data
  if (data.errorCode && data.errorCode > 0) {
    logger.error(`[HTTP ERROR] errorCode=${data.errorCode}, errorMessage=${data.errorMessage}`)

    if (data.errorCode === 2) {
      // 鉴权异常（即需要登录的接口未提供有效的鉴权信息）
      Modal.confirm({
        title: '提示',
        content: '你当前未登录，登录后可继续操作',
        okText: '去登录',
        cancelText: '稍后再说',
        centered: true,
        onOk: () => {
          // 点击确定按钮，跳转登录页
          router.push({name: 'login'})
        },
      })

      // 标记为“未登录”状态
      useAuthStore().invalid()
      // 清除本地身份证书
      clearIdentityCertificate()
      // 抛出错误，暂停执行
      throw new SolvedError('未登录')
    } else {
      throw new BusinessError(data)
    }
  }

  return response
}
