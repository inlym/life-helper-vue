import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import {fileURLToPath, URL} from 'node:url'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // Ant Design Vue 自动按需引入组件
    // https://antdv.com/docs/vue/introduce-cn
    Components({
      resolvers: [AntDesignVueResolver({importStyle: false})],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 环境变量目录
  // https://cn.vitejs.dev/config/shared-options.html#envdir
  envDir: path.resolve(__dirname, './env'),

  // 定义全局常量
  // https://cn.vitejs.dev/config/shared-options.html#define
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
    __LAST_BUILD_TIME__: JSON.stringify(new Date().toLocaleString()),
  },
})
