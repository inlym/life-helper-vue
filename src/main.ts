import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 全局完整注册 Ant Design Vue
app.use(Antd)

app.use(createPinia())
app.use(router)

app.mount('#app')
