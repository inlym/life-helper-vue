import DebugServer from '@/views/debug/DebugServer.vue'
import DebugUpload from '@/views/debug/DebugUpload.vue'
import DebugView from '@/views/debug/DebugView.vue'
import LoginView from '@/views/login/LoginView.vue'
import PrivacyView from '@/views/policy/PrivacyView.vue'
import TermsView from '@/views/policy/TermsView.vue'
import ReminderView from '@/views/reminder/ReminderView.vue'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {loginGuard} from './guards/loginGuard'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Root',
      component: HomeView,
      meta: {
        title: '首页',
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

    // 待办任务功能主页
    {
      path: '/reminder',
      name: 'reminder',
      component: ReminderView,
      meta: {
        requireAuth: true,
      },
    },

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
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
