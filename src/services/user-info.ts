import {requestForData} from '@/core/http'

/** 基础用户信息 */
export interface BaseUserInfo {
  /** 昵称 */
  nickName: string
  /** 头像的完整 URL 地址 */
  avatarUrl: string
}

/** 修改基础用户信息时的请求数据 */
export interface BaseUserInfoDTO {
  /** 昵称 */
  nickName?: string
  /** 头像资源在 OSS 的存储路径 */
  avatarKey?: string
}

/**
 * 获取基础用户信息
 */
export function getUserInfo() {
  return requestForData<BaseUserInfo>({method: 'get', url: '/user-info/base', requireAuth: true})
}

/**
 * 修改基础用户信息
 *
 * @param data 请求数据
 */
export function updateUserInfo(data: BaseUserInfoDTO) {
  return requestForData<BaseUserInfo>({method: 'post', url: '/user-info/base', data, requireAuth: true})
}