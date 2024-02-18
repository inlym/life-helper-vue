/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 应用名称 */
  readonly VITE_APP_NAME: string
  /** 服务器请求地址 */
  readonly VITE_REQUEST_BASE_URL: string
  /** 是否开启百度统计 */
  readonly VITE_BAIDU_ENABLED: string
  /** 百度统计网站 ID */
  readonly VITE_BAIDU_WEBSITE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
