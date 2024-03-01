/** 本地缓存数据使用的键名 */
export enum StorageKey {
  /** 身份证书（即登录鉴权信息） */
  IdentityCertificate = 'IDENTITY_CERTIFICATE',
  /** 登录前准备跳转的地址 */
  TargetPathBeforeLogin = 'TARGET_PATH_BEFORE_LOGIN'
}
