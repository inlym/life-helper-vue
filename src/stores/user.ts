import {getUserInfo, type BaseUserInfo} from '@/api/user'
import {StaticResource} from '@/core/constant'
import {defineStore} from 'pinia'
import {ref} from 'vue'

/** 用户信息存储库 */
export const useUserStore = defineStore(
  'user',

  () => {
    /** 昵称 */
    const nickName = ref('')

    /** 头像的完整 URL 地址 */
    const avatarUrl = ref<string>(StaticResource.DEFAULT_AVATAR)

    /** 账户 ID */
    const accountId = ref(0)

    /** 是否已获取 */
    const isAcquired = ref(false)

    /** 保存资料 */
    function save(info: BaseUserInfo) {
      nickName.value = info.nickName
      avatarUrl.value = info.avatarUrl
      accountId.value = info.accountId

      isAcquired.value = true
    }

    function clear() {
      nickName.value = ''
      avatarUrl.value = ''
      accountId.value = 0
      isAcquired.value = false
    }

    return {nickName, avatarUrl, accountId, isAcquired, save, clear}
  },
)
