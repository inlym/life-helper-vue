import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import {fileURLToPath, URL} from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      viteOptimizeDeps: true,
      eslintrc: {
        enabled: true, // <-- this
      },
    }),

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
})
