import './assets/main.css'

import {createPinia} from 'pinia'
import {createApp} from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import {baiduEnable, baiduWebsiteId, registerBaiduAnalytics} from './core/analytics'
import router from './router'

const vuetify = createVuetify({components, directives})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

// 仅在线上环境开启百度统计
if (baiduEnable) {
  app.use(registerBaiduAnalytics, {
    router,
    websiteIds: [baiduWebsiteId],
    debug: false
  })
}

app.mount('#app')
