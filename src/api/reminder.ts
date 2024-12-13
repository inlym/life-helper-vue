import {requestForData} from '@/core/http'
import type {CommonListResponse} from '@/core/model'

/** 待办项目 */
export interface ReminderProject {
  /** 项目 ID */
  id: number
  /** 项目名称 */
  name: string
  /** 未完成的任务数 */
  uncompletedTaskCount: number
}

/**
 * 新增一个待办项目
 *
 * @param name 项目名称
 *
 * @date 2024/12/13
 * @since 3.0.0
 */
export function addProject(name: string) {
  return requestForData<ReminderProject>({
    method: 'post',
    url: '/reminder/projects',
    data: {name},
    requireAuth: true,
  })
}

/**
 * 删除一个待办项目
 *
 * @param projectId 项目 ID
 *
 * @date 2024/12/13
 * @since 3.0.0
 */
export function deleteProject(projectId: number) {
  return requestForData<ReminderProject>({
    method: 'delete',
    url: `/reminder/projects/${projectId}`,
    requireAuth: true,
  })
}

/**
 * 获取所有的待办项目
 *
 * @date 2024/12/13
 * @since 3.0.0
 */
export function getProjectList() {
  return requestForData<CommonListResponse<ReminderProject>>({
    method: 'get',
    url: '/reminder/projects',
    requireAuth: true,
  })
}
