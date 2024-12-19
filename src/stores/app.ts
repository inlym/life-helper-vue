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
        colorPrimary: '#2aae67',
      },
    })

    return {darkMode, themeConfig}
  },

  {
    persist: true,
  },
)
