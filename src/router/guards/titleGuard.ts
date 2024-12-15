import type {NavigationGuard, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'

/** 网页标题路由守卫 */
export const titleGuard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  /** 网页标题 */
  const title = to.meta.title

  if (title) {
    document.title = `${title} - 小鸣助手`
  } else {
    document.title = '小鸣助手'
  }
}
