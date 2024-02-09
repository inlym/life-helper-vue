/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用名称 */
  readonly VITE_APP_NAME: string
  /** 服务器请求地址 */
  readonly VITE_REQUEST_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
