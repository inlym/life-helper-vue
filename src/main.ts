import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)

// 注册 Vuetify 组件库
app.use(
  createVuetify({
    components,
    directives
  })
)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

app.mount('#app')
