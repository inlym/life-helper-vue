import {Method} from 'alova'

export const requestInterceptor: (method: Method) => void | Promise<void> = (method) => {
  // 第一部分：请求头附带鉴权信息

  // 临时调试
  console.log('baseURL', method.baseURL)
  console.log('config', method.config)
  console.log('context', method.context)
  console.log('data', method.data)
  console.log('dhs', method.dhs)
  console.log('meta', method.meta)
  console.log('type', method.type)
  console.log('uhs', method.uhs)
  console.log('url', method.url)
}
