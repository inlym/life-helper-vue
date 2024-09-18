import Antd from 'ant-design-vue'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {setGlobalOptions} from 'vue-request'
import Vue3Lottie from 'vue3-lottie'

import 'ant-design-vue/dist/reset.css'
import 'tailwindcss/tailwind.css'

// VueRequest 全局配置
setGlobalOptions({
  /** 手动触发请求 */
  manual: true,
  /** 延迟的毫秒数 */
  loadingDelay: 1000,
  /** 保持 loading 的毫秒数 */
  loadingKeep: 1000,
})

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

// 全局完整注册 Ant Design Vue
app.use(Antd)

// 注册 Vue 3 Lottie 组件
// [Vue 3 Lottie](https://vue3-lottie.vercel.app/introduction/vue-3)
app.use(Vue3Lottie, {name: 'LottieAnimation'})

app.mount('#app')
