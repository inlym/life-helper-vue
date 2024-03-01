import {alovaInstance} from '@/core/http'
import type {CommonListResponse, CommonResponse} from '@/core/types'

/** AI 会话 */
export interface AiChat extends CommonResponse {
  /** 会话 ID */
  id: number
  /** 使用的模型 */
  model: string
  /** 描述 */
  description: string
  /** 最后一条消息时间 */
  lastMessageTime: string
  /** 消息列表 */
  messages: AiChatMessage[]
}

/** AI 会话消息 */
export interface AiChatMessage {
  /** 消息 ID */
  id: number
  /** 文本内容 */
  content: string
  /** 角色，可选值 `system`, `user`, `assistant` */
  role: string
}

/** 获取会话列表 */
export const getChatList = () => alovaInstance.Get<CommonListResponse<AiChat>>('/ai/chats')

/** 获取单个会话 */
export const getChat = (id: number) => alovaInstance.Get<AiChat>(`/ai/chat/${id}`)

/** 创建会话 */
export const createChat = (prompt: string) => alovaInstance.Post<AiChat>('/ai/chat', {prompt})

/** 补充会话 */
export const appendChat = (id: number, prompt: string) => alovaInstance.Put<AiChat>(`/ai/chat/${id}`, {prompt})

/** 删除会话 */
export const deleteChat = (id: number) => alovaInstance.Delete<AiChat>(`/ai/chat/${id}`)
