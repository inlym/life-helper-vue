import {defineStore} from 'pinia'
import {requestForData} from '@/core/http'
import {ref} from 'vue'
import {StaticResource} from '@/core/constant'
import {getUserInfo} from '@/api/user'

export const useUserStore = defineStore(
  'user',

  () => {
    /** 昵称 */
    const nickName = ref('小鸣助手用户')

    /** 头像的完整 URL 地址 */
    const avatarUrl = ref(StaticResource.DEFAULT_AVATAR.toString())

    /** 更新资料 */
    async function update() {
      const result = await getUserInfo()

      nickName.value = result.nickName
      avatarUrl.value = result.avatarUrl
    }

    return {nickName, avatarUrl, update}
  },

  {
    persist: true,
  },
)
