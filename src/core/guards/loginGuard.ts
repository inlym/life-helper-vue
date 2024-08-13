import type { NavigationGuard } from 'vue-router'

export const loginGuard: NavigationGuard = (to) => {
  /** 目标路由是否需要登录 */
  const requiredAuth = to.meta.requireAuth

  if (requiredAuth) {
    // TODO
    return { path: '/login' }
  }
}
