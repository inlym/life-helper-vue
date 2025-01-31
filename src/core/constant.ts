// 常量、枚举值等

/** 存储在 localStorage 中的数据的“键名” */
export enum StorageKey {
  /** 访问凭据 */
  ACCESS_TOKEN = 'WEUTIL_ACCESS_TOKEN',

  /** 重定向 URL */
  REDIRECT_URL = 'WEUTIL_REDIRECT_URL',
}

/** 静态资源 */
export enum StaticResource {
  /** 默认头像（空头像） */
  DEFAULT_AVATAR = 'https://static.weutil.com/images/default.jpg',

  PRODUCT_AI = 'https://static.weutil.com/web/product_ai.svg',
  PRODUCT_REMINDER = 'https://static.weutil.com/web/product_reminder.svg',
  PRODUCT_NOTE = 'https://static.weutil.com/web/product_note.svg',
  PRODUCT_ALBUM = 'https://static.weutil.com/web/product_album.svg',
}
