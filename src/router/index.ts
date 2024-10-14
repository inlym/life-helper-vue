import PrivacyView from '@/views/policy/PrivacyView.vue'
import TermsView from '@/views/policy/TermsView.vue'
import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DebugView from '@/views/debug/DebugView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Root',
      component: HomeView,
      meta: {
        title: '小鸣助手',
        requireAuth: false,
      },
    },

    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
  ],
})
