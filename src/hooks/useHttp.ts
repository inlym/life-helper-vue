import {BusinessError} from '@/core/model'
import {Modal} from 'ant-design-vue'
import {useRequest, type Options, type Service} from 'vue-request'

/**
 * 发起 HTTP 数据请求
 *
 * ### 使用说明
 * 当前方法用于在页面层级注册 HTTP 请求
 */
export function useHttp<R, P extends unknown[] = any>(service: Service<R, P>, options?: Options<R, P>) {
  // 对 `options` 进行默认值处理
  if (options === undefined) {
    options = {}
  }

  if (options.manual === undefined) {
    // 默认手动触发请求
    options.manual = true
  }
  if (options.loadingDelay === undefined) {
    // 延迟 200ms （而不是立即）才将 loading 由 false 改为 true
    options.loadingDelay = 200
  }
  if (options.loadingKeep === undefined) {
    // loading 后的持续时间
    options.loadingKeep = 1000
  }

  // 发生错误时，自动弹窗提示
  if (options.onError === undefined) {
    options.onError = (error: Error) => {
      if (error instanceof BusinessError) {
        // 普通业务错误，直接抛出弹窗提示
        Modal.info({title: '提示', content: error.errorMessage, okText: '我知道了'})
      }
    }
  }

  return useRequest<R, P>(service, options)
}
