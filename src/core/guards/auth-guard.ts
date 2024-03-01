import type {NavigationGuardWithThis} from 'vue-router'
import {isLogined} from '../auth'
import {StorageKey} from '../storage'

export const authGuard: NavigationGuardWithThis<undefined> = (to) => {
  /** 目标路由是否需要登录 */
  const requireAuth = to.meta.requireAuth

  if (requireAuth && !isLogined()) {
    /** 目标路径 */
    const targetPath = to.fullPath
    localStorage.setItem(StorageKey.TargetPathBeforeLogin, targetPath)

    // 将用户重定向到登录页面
    return {path: '/login'}
  }
}
