import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

app.use(createPinia())

// 注册路由
app.use(router)

// 对 Ant Design Vue 进行全局完整注册
// https://antdv.com/docs/vue/getting-started-cn
app.use(Antd)

app.mount('#app')
