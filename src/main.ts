import Antd from 'ant-design-vue'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {setGlobalOptions} from 'vue-request'

import 'ant-design-vue/dist/reset.css'
import 'tailwindcss/tailwind.css'

// VueRequest 全局配置
setGlobalOptions({
  manual: true,
})

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

// 全局完整注册 Ant Design Vue
app.use(Antd)

app.mount('#app')
