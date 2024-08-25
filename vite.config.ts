import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  // Vuetify 插件
  // https://vuetifyjs.com/zh-Hans/features/treeshaking
  plugins: [vue(), vuetify(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 环境变量目录
  // https://cn.vitejs.dev/config/shared-options.html#envdir
  envDir: path.resolve(__dirname, './env')
})
