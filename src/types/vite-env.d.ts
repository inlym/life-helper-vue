/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用名称 */
  readonly VITE_APP_NAME: string
  /** 环境名称: 开发、测试、生产 */
  readonly VITE_ENV_NAME: 'dev' | 'test' | 'prod'
  /** 服务器请求地址 */
  readonly VITE_REQUEST_BASE_URL: string
  /** 阿里云 API 网关摘要签名认证使用的 AppKey */
  readonly VITE_ALIYUN_APP_KEY: string
  /** 阿里云 API 网关摘要签名认证使用的 AppSecret */
  readonly VITE_ALIYUN_APP_SECRET: string
  /** 阿里云验证码服务场景 ID */
  readonly VITE_ALIYUN_CAPTCHA_SCENE_ID: string
  /** 阿里云验证码服务身份标 */
  readonly VITE_ALIYUN_CAPTCHA_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 以下来源于在 Vite 的 `difene` 配置的全局常量
// https://cn.vitejs.dev/config/shared-options.html#define

/** 应用版本号 */
declare const __APP_VERSION__: string

/** 最后一次构建时间 */
declare const __LAST_BUILD_TIME__: string

/** 由外部脚本引入的阿里云验证码初始化函数 */
declare function initAliyunCaptcha(options: any): void
