import Antd from 'ant-design-vue'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'ant-design-vue/dist/reset.css'

const app = createApp(App)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

// 全局完整注册 Ant Design Vue
app.use(Antd)

app.mount('#app')
