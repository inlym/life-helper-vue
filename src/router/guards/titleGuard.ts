import type {NavigationGuard, RouteLocationNormalized, RouteLocationNormalizedLoaded} from 'vue-router'

const appName = import.meta.env.VITE_APP_NAME

/** 网页标题路由守卫 */
export const titleGuard: NavigationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) => {
  /** 网页标题 */
  const title = to.meta.title

  if (title) {
    document.title = `${title} - ${appName}`
  } else {
    document.title = appName
  }
}
