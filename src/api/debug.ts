import {requestForData} from '@/core/http'

/** 服务器信息 */
export interface ServerInfo {
  /** 最近一次项目启动的时间 */
  launchTime: string
  /** 服务器的当前时间 */
  now: string
  /** 本次项目启动后运行时长（单位：秒） */
  duration: number
  /** 当前激活的配置文件名称 */
  activeProfiles: string
  /** 当前使用的端口号 */
  serverPort: string
  /** 当前使用的 Spring Boot 版本号 */
  springBootVersion: string
  /** 主机名 */
  hostName: string
  /** IP 地址 */
  ip: string
  /** 时区 */
  timeZone: string
}

/**
 * 获取服务器信息和状态
 *
 * @since 3.0.0
 * @date 2024/12/04
 */
export function getServerInfo() {
  return requestForData<ServerInfo>({method: 'get', url: '/debug/system/server'})
}

export function debug(id: number, name: string) {
  return requestForData({method: 'post', url: '/debug', params: {id}, data: {name, age: 19}})
}

export function debugData(data: any) {
  return requestForData({method: 'post', url: '/debug/data', params: {id: 11111111}, data})
}
