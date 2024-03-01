import {alovaInstance} from '@/core/http'
import multiavatar from '@multiavatar/multiavatar/esm'

/** 生成 SVG 头像 */
export const generateSvgAvatar = (name: string) => multiavatar(name)

/** 生成自定义头像 */
export const generateSvgAvatarUrl = (name: string) => {
  const svgStr = generateSvgAvatar(name)
  const encoded = window.btoa(svgStr)
  return `data:image/svg+xml;base64,${encoded}`
}

/** 基础用户信息 */
export interface BasicUserInfo {
  /** 用户昵称 */
  nickName: string
  /** 头像图片的 URL 地址 */
  avatarUrl: string
}

/** 完整用户信息 */
export interface UserInfo extends BasicUserInfo {
  /** 性别：男、女、未知 */
  gender: string
}

/** 获取完整用户信息 */
export const getUserInfo = () => alovaInstance.Get<UserInfo>('/userinfo')
