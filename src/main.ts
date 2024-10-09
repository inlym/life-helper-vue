import Antd from 'ant-design-vue'
import {createPinia} from 'pinia'
import {createPersistedState} from 'pinia-plugin-persistedstate'
import {createApp} from 'vue'
import Vue3Lottie from 'vue3-lottie'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css'
import 'tailwindcss/tailwind.css'

const app = createApp(App)

// 注册 Pinia
const pinia = createPinia()
// https://prazdevs.github.io/pinia-plugin-persistedstate/
pinia.use(createPersistedState({key: (id) => `__pinia__${id}__`}))
app.use(pinia)

// 注册路由
app.use(router)

// 全局完整注册 Ant Design Vue
app.use(Antd)

// 注册 Vue 3 Lottie 组件
// [Vue 3 Lottie](https://vue3-lottie.vercel.app/introduction/vue-3)
app.use(Vue3Lottie, {name: 'LottieAnimation'})

app.mount('#app')
