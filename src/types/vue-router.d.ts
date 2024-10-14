import 'vue-router'

export {}

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否需要登录 */
    requireAuth?: boolean
    /** 页面标题 */
    title?: string
  }
}
