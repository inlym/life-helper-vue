import {requestForData} from '@/core/http'
import type {CommonListResponse} from '@/core/model'

/** 待办项目操作 */
export enum ReminderProjectOperation {
  Add = 'add_project',
  Delete = 'delete_project',
  Rename = 'rename_project',
}

/** 待办项目操作 */
export enum ReminderTaskOperation {
  Add = 'add_task',
  Delete = 'delete_task',
  Move = 'move_task',
  Edit = 'edit_task',
}

/** 待办项目 */
export interface ReminderProject {
  /** 项目 ID */
  id: number
  /** 项目名称 */
  name: string
  /** 未完成的任务数 */
  uncompletedTaskCount: number
}

/** 待办任务 */
export interface ReminderTask {
  /** 待办任务 ID */
  id: number
  /** 所属项目 ID */
  projectId: number
  /** 任务名称 */
  name: string
  /** 任务描述内容文本 */
  content: string
  /** 截止时间 */
  dueTime: string
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

/**
 * 添加新任务
 *
 * @param name 任务名称
 * @param projectId 所属项目 ID
 *
 * @date 2024/12/13
 * @since 3.0.0
 */
export function addTask(name: string, projectId: number) {
  return requestForData<ReminderTask>({
    method: 'post',
    url: '/reminder/tasks',
    data: {name, projectId},
    requireAuth: true,
  })
}
