// 环境变量过渡层

/** 环境变量 */
export const env = {
  /** 环境名称 */
  ENV_NAME: import.meta.env.VITE_ENV_NAME,
  /** 应用名称 */
  APP_NAME: import.meta.env.VITE_APP_NAME,
  /** 服务器请求地址前缀 */
  REQUEST_BASE_URL: import.meta.env.VITE_REQUEST_BASE_URL,
  /** 阿里云 API 网关摘要签名认证使用的 AppKey */
  ALIYUN_APP_KEY: import.meta.env.VITE_ALIYUN_APP_KEY,
  /** 阿里云 API 网关摘要签名认证使用的 AppSecret */
  ALIYUN_APP_SECRET: import.meta.env.VITE_ALIYUN_APP_SECRET,
  /** 阿里云验证码服务场景 ID */
  ALIYUN_CAPTCHA_SCENE_ID: import.meta.env.VITE_ALIYUN_CAPTCHA_SCENE_ID,
  /** 阿里云验证码服务身份标 */
  ALIYUN_CAPTCHA_PREFIX: import.meta.env.VITE_ALIYUN_CAPTCHA_PREFIX,
  /** 阿里云 API 网关 JWT 认证插件配置 */
  ALIYUN_APIGW_JWT_KEYPAIR_JSON: import.meta.env.VITE_ALIYUN_APIGW_JWT_KEYPAIR_JSON,
}
