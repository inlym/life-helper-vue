import type {NavigationGuardWithThis} from 'vue-router'
import {isLogined} from '../auth'

export const authGuard: NavigationGuardWithThis<undefined> = (to, from) => {
  /** 目标路由是否需要登录 */
  const requireAuth = to.meta.requireAuth

  if (requireAuth && !isLogined()) {
    // 将用户重定向到登录页面
    return {path: '/login'}
  }
}
