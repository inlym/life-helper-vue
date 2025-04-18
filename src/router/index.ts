import DebugServer from '@/views/debug/DebugServer.vue'
import DebugUpload from '@/views/debug/DebugUpload.vue'
import DebugView from '@/views/debug/DebugView.vue'
import LoginView from '@/views/login/LoginView.vue'
import PrivacyView from '@/views/policy/PrivacyView.vue'
import TermsView from '@/views/policy/TermsView.vue'
import ReminderView from '@/views/reminder/ReminderView.vue'
import DevelopingView from '@/views/standalone/developing/DevelopingView.vue'
import UserCenter from '@/views/user/UserCenter.vue'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {loginGuard} from './guards/loginGuard'
import {titleGuard} from './guards/titleGuard'
import HomePage from '@/views/home/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // 首页
    {
      path: '/',
      name: 'Root',
      component: HomePage,
      meta: {
        requireAuth: false,
      },
    },

    // 登录页
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: '登录',
        requireAuth: false,
      },
    },

    // 用户中心
    {
      path: '/me',
      name: 'UserCenter',
      component: UserCenter,
      meta: {
        title: '个人中心',
        requireAuth: true,
      },
    },

    // 待办任务功能主页跳转
    {
      path: '/reminder',
      redirect: '/reminder/projects/filter-all/tasks',
    },

    // 待办任务功能主页
    {
      path: '/reminder/projects/:projectId/tasks/:taskId?',
      name: 'reminder',
      component: ReminderView,
      meta: {
        title: '我的待办',
        requireAuth: true,
      },
    },

    {
      path: '/developing',
      name: 'developing',
      component: DevelopingView,
      meta: {
        title: '网站维护中',
        requireAuth: true,
      },
    },

    {
      path: '/policy/terms',
      name: 'terms',
      component: TermsView,
    },

    {
      path: '/policy/privacy',
      name: 'privacy',
      component: PrivacyView,
    },

    {
      path: '/debug',
      name: 'debug',
      component: DebugView,
    },

    {
      path: '/debug/upload',
      name: 'DebugUpload',
      component: DebugUpload,
    },

    {
      path: '/debug/server',
      name: 'DebugServer',
      component: DebugServer,
    },
  ],
})

router.beforeEach(loginGuard)
router.beforeEach(titleGuard)
