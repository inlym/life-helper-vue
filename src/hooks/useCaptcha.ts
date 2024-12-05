import {env} from '@/core/env'
import {useScriptTag} from '@vueuse/core'

/** 使用验证码方法参数 */
export interface UseCaptchaOptions {
  /** 页面上预留的渲染验证码的元素，示例值：`#captcha-element` */
  element?: string
  /** 触发验证码弹窗的元素，示例值：`#captcha-button` */
  button?: string
  /** 业务请求(带验证码校验)回调函数 */
  captchaVerifyCallback: (captchaVerifyParam: string) => Promise<{
    captchaResult: boolean
    bizResult: boolean
  }>
  /** 业务请求结果回调函数 */
  onBizResultCallback: () => void
  /** 绑定验证码实例函数 */
  getInstance: (instance: any) => void
}

declare const initAliyunCaptcha: (options: any) => void

/** 动态引入的脚本地址 */
const scriptUrl = 'https://o.alicdn.com/captcha-frontend/aliyunCaptcha/AliyunCaptcha.js'

/** 使用阿里云验证码 */
export function useCaptcha(options: UseCaptchaOptions) {
  const {load, unload} = useScriptTag(
    scriptUrl,
    () => {
      initAliyunCaptcha({
        SceneId: env.ALIYUN_CAPTCHA_SCENE_ID,
        prefix: env.ALIYUN_CAPTCHA_PREFIX,
        mode: 'popup',
        element: typeof options.element === 'string' ? options.element : '#captcha-element',
        button: typeof options.button === 'string' ? options.button : '#captcha-button',
        captchaVerifyCallback: options.captchaVerifyCallback, // 业务请求(带验证码校验)回调函数，无需修改
        onBizResultCallback: options.onBizResultCallback, // 业务请求结果回调函数，无需修改
        getInstance: options.getInstance,
      })
    },
    {manual: true},
  )

  load()

  return unload
}
