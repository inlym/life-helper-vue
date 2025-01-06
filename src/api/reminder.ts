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
  /** 把待办任务标记为“已完成” */
  COMPLETE = 'COMPLETE',
  /** 把待办任务标记为“未完成” */
  UNCOMPLETE = 'UNCOMPLETE',
  /** 清空待办任务标的截止时间 */
  CLEAR_DUE_TIME = 'CLEAR_DUE_TIME',
  /** 置顶 */
  PIN = 'PIN',
  /** 取消置顶 */
  UNPIN = 'UNPIN',
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
  /** 任务完成时间 */
  completeTime: string
  /** 截止时间 */
  dueTime: string
  /** 所属的项目名称 */
  projectName: string
}

export enum ReminderFilterType {
  /** 所有待办（未完成） */
  ALL_UNCOMPLETED = 'ALL_UNCOMPLETED',
  /** 已完成 */
  ALL_COMPLETED = 'ALL_COMPLETED',
  /** 今天 */
  TODAY = 'TODAY',
  /** 已过期 */
  EXPIRED = 'EXPIRED',
  /** 无期限 */
  UNDATED = 'UNDATED',
  /** 未分类（未选择项目的） */
  UNSPECIFIED = 'UNSPECIFIED',
}

export interface UpdateReminderTaskDTO {
  /** 任务名称 */
  name: string
  /**
   * 所属项目 ID
   *
   * <h3>说明
   * <p>该值为 {@code 0} 则表示不从属于任何项目。
   */
  projectId: number
  /** 任务描述内容文本 */
  content: string
  /** 截止时间 */
  dueTime: string
  /** 特定操作 */
  operation: ReminderTaskOperation
}

export interface ReminderFilter {
  /** 名称 */
  name: string
  /** 类型 */
  type: ReminderFilterType
  /** 计数（除“已完成”过滤器外，其余均为未完成任务数） */
  num: number
}

export interface FilterTaskCount {
  /** 所有未完成任务数 */
  allUncompleted: number
  /** 今天的未完成任务数 */
  allCompleted: number
  /** 所有已完成任务数 */
  today: number
  /** 已过期（并且未完成）的任务数 */
  expired: number
  /** 无期限（并且未完成）的任务数 */
  undated: number
  /** 未分类（并且未完成）的任务数 */
  unspecified: number
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
 * 对项目改名
 *
 * @param projectId 项目 ID
 * @param newName 新的项目名称
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function renameProject(projectId: number, newName: string) {
  return requestForData<ReminderProject>({
    method: 'put',
    url: `/reminder/projects/${projectId}`,
    requireAuth: true,
    data: {name: newName},
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

/**
 * 删除待办任务
 *
 * @param taskId 待办任务 ID
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function deleteTask(taskId: number) {
  return requestForData<ReminderTask>({
    method: 'delete',
    url: `/reminder/tasks/${taskId}`,
    requireAuth: true,
  })
}

/**
 * 更新任务信息
 *
 * @param taskId 待办任务 ID
 * @param dto 请求数据
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function updateTask(taskId: number, dto: Partial<UpdateReminderTaskDTO>) {
  return requestForData<ReminderTask>({
    method: 'put',
    url: `/reminder/tasks/${taskId}`,
    requireAuth: true,
    data: dto,
  })
}

/**
 * 对任务进行操作
 *
 * @param taskId 待办任务 ID
 * @param operation 操作方式
 *
 * @date 2025/01/06
 * @since 3.0.0
 */
export function operateTask(taskId: number, operation: ReminderTaskOperation) {
  return updateTask(taskId, {operation})
}

/**
 * 查看单条任务详情
 *
 * @param taskId 待办任务 ID
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function getTaskDetail(taskId: number) {
  return requestForData<ReminderTask>({
    method: 'get',
    url: `/reminder/tasks/${taskId}`,
    requireAuth: true,
  })
}

/**
 * 查看各个过滤器的未完成任务数
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function getFilterList() {
  return requestForData<CommonListResponse<ReminderFilter>>({
    method: 'get',
    url: `/reminder/filters`,
    requireAuth: true,
  })
}

/**
 * 以过滤器为条件，获取任务列表
 *
 * @param filter 过滤器
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function getTasksByFilter(filter: ReminderFilterType) {
  return requestForData<CommonListResponse<ReminderTask>>({
    method: 'get',
    url: `/reminder/tasks`,
    params: {filter},
    requireAuth: true,
  })
}

/**
 * 以项目 ID 为条件，获取任务列表
 *
 * @param filter 过滤器
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function getTasksByProjectId(projectId: number) {
  return requestForData<CommonListResponse<ReminderTask>>({
    method: 'get',
    url: `/reminder/tasks`,
    params: {project_id: projectId},
    requireAuth: true,
  })
}
