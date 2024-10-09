import {defineStore} from 'pinia'
import {requestForData} from '@/core/http'
import {ref} from 'vue'
import {StaticResource} from '@/core/constant'

/** 基础用户信息 */
export interface UserInfo {
  /** 昵称 */
  nickName: string
  /** 头像的完整 URL 地址 */
  avatarUrl: string
}

/** 修改基础用户信息时的请求数据 */
export interface UserInfoDTO {
  /** 昵称 */
  nickName?: string
  /** 头像资源在 OSS 的存储路径 */
  avatarKey?: string
}

/**
 * 获取基础用户信息
 */
export function getUserInfo() {
  return requestForData<UserInfo>({method: 'get', url: '/user-info/base', requireAuth: true})
}

/**
 * 修改基础用户信息
 *
 * @param data 请求数据
 */
export function modifyUserInfo(data: UserInfoDTO) {
  return requestForData<UserInfo>({method: 'post', url: '/user-info/base', data, requireAuth: true})
}

export const useUserInfoStore = defineStore(
  'USER_INFO',

  () => {
    /** 昵称 */
    const nickName = ref('小鸣助手用户')
    /** 头像的完整 URL 地址 */
    const avatarUrl = ref(StaticResource.DEFAULT_AVATAR.toString())

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
