import './assets/main.scss'

import '@mdi/font/css/materialdesignicons.css'
import {createPinia} from 'pinia'
import {createApp} from 'vue'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({components, directives, icons: {defaultSet: 'mdi'}})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
