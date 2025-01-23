import type {IdentityCertificate} from '@/api/login'
import {clearIdentityCertificate, isLogined, saveIdentityCertificate} from '@/core/auth'
import {message, Modal} from 'ant-design-vue'
import {defineStore} from 'pinia'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

export const useAuthStore = defineStore(
  'auth',

  () => {
    const router = useRouter()

    /** 是否已登录(该值仅用于页面状态展示，不用于逻辑判断) */
    const logined = ref(isLogined())

    /** 标记登录状态已失效 */
    function invalid() {
      logined.value = false
    }

    /** 登录 */
    function login(cert: IdentityCertificate) {
      saveIdentityCertificate(cert)
      logined.value = true
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

    return {logined, invalid, login, logout}
  },
)
