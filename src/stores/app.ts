import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAppStore = defineStore(
  'app',

  () => {
    /** 是否启用暗黑模式 */
    const darkMode = ref(false)

    /** 主题配置 */
    const themeConfig = ref({
      token: {
        // 使用“青葱色”作为品牌色
        colorPrimary: '#0eb83a',
      },
    })

    return {darkMode, themeConfig}
  },

  {
    persist: true,
  },
)
