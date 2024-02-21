/** HTTP 请求头 */
export enum HttpHeaders {
  // ============================= 自定义请求头 =============================

  /** 登录令牌 */
  AUTH_TOKEN = 'x-lifehelper-auth-token',

  /**
   * 客户端类型
   *
   * ### 说明
   * 1. `miniprogram` -> 小程序
   * 2. `web` -> 网页
   */
  CLIENT_TYPE = 'x-lifehelper-client-type',

  /**
   * 客户端信息
   *
   * ### 说明
   * 1. 组合多项键值对，使用 `; ` 分割。
   * 2. 文本格式示例：`key1=value1; key2=value2; key3=value3`
   */
  CLIENT_INFO = 'x-lifehelper-client-info',

  // ============================= 标准请求头 =============================
  // 只列举在项目中用到的

  ACCEPT = 'accept',
  CONTENT_TYPE = 'content-type',

  // ==================== 阿里云 API 网关签名认证专用请求头 ====================

  /** 阿里云 API 网关摘要签名认证使用的 AppKey */
  X_CA_KEY = 'x-ca-key',

  /** 用于防止重放攻击，保证短期内多个请求不重复即可 */
  X_CA_NONCE = 'x-ca-nonce',

  /** 计算后的签名 */
  X_CA_SIGNATURE = 'x-ca-signature',

  /** 参与计算签名的请求头 */
  X_CA_SIGNATURE_HEADERS = 'x-ca-signature-headers',

  /** 对请求数据做 MD5 计算的值 */
  CONTENT_MD5 = 'content-md5'
}

export enum ContentType {
  APPLICATION_JSON = 'application/json'
}
