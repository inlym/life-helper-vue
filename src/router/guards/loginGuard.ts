import {isLogined} from '@/core/auth'
import {StorageKey} from '@/core/constant'
import {logger} from '@/core/logger'
import type {NavigationGuard, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'

export const loginGuard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  /** 目标路由是否需要登录 */
  const requiredAuth = to.meta.requireAuth
  const logined = isLogined()

  logger.debug(`[Router] from=${from.fullPath}, to=${to.fullPath}, requiredAuth=${!!requiredAuth}, logined=${logined}`)

  if (requiredAuth && !logined) {
    // 记录要跳转的地址，并跳转登录页，登录后再继续访问该页面
    localStorage.setItem(StorageKey.REDIRECT_URL, to.fullPath)

    return {path: '/login'}
  }
}
