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
    options.manual = true
  }
  if (options.loadingDelay === undefined) {
    options.loadingDelay = 500
  }
  if (options.loadingKeep === undefined) {
    options.loadingKeep = 1000
  }
  // 发生错误时，自动弹窗提示
  if (options.onError === undefined) {
    options.onError = (error: Error) => {
      if (error instanceof BusinessError) {
        // 已经在 axios 拦截器中处理，将错误封装为了 `BusinessError`，因此发生错误一定会进入这一个分支
        if (!error.handled) {
          Modal.info({title: '提示', content: error.errorMessage, okText: '我知道了'})
        }
      }
    }
  }

  return useRequest<R, P>(service, options)
}
