import {clearIdentityCertificate, isLogined} from '@/core/auth'
import {router} from '@/router'
import {message, Modal} from 'ant-design-vue'
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useAuthStore = defineStore(
  'auth',

  () => {
    /** 是否已登录(该值仅用于页面状态展示，不用于逻辑判断) */
    const logined = ref(isLogined())

    function invalid() {
      console.log('invalid store')
      logined.value = false
    }

    /** 退出登录 */
    function logout() {
      Modal.confirm({
        title: '提示',
        content: '是否确认退出登录？',

        onOk: () => {
          clearIdentityCertificate()
          logined.value = false
          message.success('你已退出登录')
          router.push('/login')
        },
      })
    }

    return {logined, invalid, logout}
  },
)
