import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import {fileURLToPath, URL} from 'node:url'
import Icons from 'unplugin-icons/vite'
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import {defineConfig} from 'vite'
import obfuscatorPlugin from 'vite-plugin-javascript-obfuscator'
import vueDevTools from 'vite-plugin-vue-devtools'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),

    // https://github.com/unplugin/unplugin-icons
    Icons({compiler: 'vue3'}),

    // Ant Design Vue 自动按需引入组件
    // https://antdv.com/docs/vue/introduce-cn
    Components({
      resolvers: [AntDesignVueResolver({importStyle: false})],
    }),

    // 代码混淆插件
    // https://github.com/elmeet/vite-plugin-javascript-obfuscator
    obfuscatorPlugin({
      include: ['src/**/*.ts'],
      apply: 'build',
      options: {
        transformObjectKeys: true,
      },
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

  // 构建配置
  // https://cn.vite.dev/config/build-options.html
  build: {
    // 自定义底层的 Rollup 打包配置
    // https://cn.vite.dev/config/build-options.html#build-rollupoptions
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          antd: ['ant-design-vue', '@ant-design/icons-vue'],
        },
      },
    },
    // 启用/禁用 gzip 压缩大小报告
    // https://cn.vite.dev/config/build-options.html#build-reportcompressedsize
    reportCompressedSize: true,
    // 规定触发警告的 chunk 大小
    // https://cn.vite.dev/config/build-options.html#build-chunksizewarninglimit
    chunkSizeWarningLimit: 1000,
  },

  // https://cn.vite.dev/config/shared-options.html#esbuild
  esbuild: {
    // https://esbuild.github.io/api/#legal-comments
    legalComments: 'none',
  },
})
