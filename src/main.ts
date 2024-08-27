import {createPinia} from 'pinia'
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {aliases, mdi} from 'vuetify/iconsets/mdi'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from 'vuetify'

const app = createApp(App)

// 注册 Vuetify
app.use(
  createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {mdi},
    },
  }),
)

// 注册 Pinia
app.use(createPinia())

// 注册路由
app.use(router)

app.mount('#app')
