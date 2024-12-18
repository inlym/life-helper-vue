import {getUserInfo, type BaseUserInfo} from '@/api/user'
import {isLogined} from '@/core/auth'
import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore(
  'user',

  () => {
    /** 昵称 */
    const nickName = ref('')

    /** 头像的完整 URL 地址 */
    const avatarUrl = ref('')

    /** 账户 ID */
    const accountId = ref(0)

    /** 是否已获取 */
    const isAcquired = ref(false)

    /** 保存 */
    function save(info: BaseUserInfo) {
      nickName.value = info.nickName
      avatarUrl.value = info.avatarUrl
      accountId.value = info.accountId

      isAcquired.value = true
    }

    /** 更新资料 */
    async function update() {
      const result = await getUserInfo()

      save(result)
    }

    /** 如果已登录则更新资料 */
    function updateIfLogined() {
      if (isLogined()) {
        update()
      }
    }

    function clear() {
      nickName.value = ''
      avatarUrl.value = ''
      accountId.value = 0
      isAcquired.value = false
    }

    return {nickName, avatarUrl, accountId, isAcquired, save, update, updateIfLogined, clear}
  },

  {persist: true},
)
