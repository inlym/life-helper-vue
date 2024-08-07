/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用名称 */
  readonly VITE_APP_NAME: string
  /** 服务器请求地址 */
  readonly VITE_REQUEST_BASE_URL: string
  /** 阿里云 API 网关摘要签名认证使用的 AppKey */
  readonly VITE_ALIYUN_APP_KEY: string
  /** 阿里云 API 网关摘要签名认证使用的 AppSecret */
  readonly VITE_ALIYUN_APP_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
