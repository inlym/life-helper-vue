import {requestForData} from '@/core/http'
import type {CommonListResponse, SingleNumberResponse} from '@/core/model'

/** 待办项目操作 */
export enum ReminderTaskOperation {
  // 把待办任务标记为“已完成”
  COMPLETE = 'COMPLETE',
  // 把待办任务标记为“未完成”
  UNCOMPLETE = 'UNCOMPLETE',
  // 清空待办任务标的截止时间
  CLEAR_DUE_DATETIME = 'CLEAR_DUE_DATETIME',
  // 置顶
  PIN = 'PIN',
  // 取消置顶
  UNPIN = 'UNPIN',
}

/** 任务优先级 */
export enum Priority {
  /** 无优先级 */
  NONE = 0,
  /** 低优先级 */
  LOW = 1,
  /** 中优先级 */
  MEDIUM = 2,
  /** 高优先级 */
  HIGH = 3,
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
  completeTime?: string
  /** 截止期限的日期部分（年月日） */
  dueDate?: string
  /** 截止期限的时间部分（时分秒） */
  dueTime?: string
  /** 所属的项目名称 */
  projectName?: string
  /** 优先级 */
  priority: Priority
}

export enum ReminderFilterType {
  // 所有
  ALL = 'all',
  // 收集箱（即未设置项目的）
  INBOX = 'inbox',
  // 今天
  TODAY = 'today',
  // 最近7天
  NEXT_SEVEN_DAYS = 'next_seven_days',
  // 已过期
  OVERDUE = 'overdue',
  // 未设置截止日期的
  NO_DATE = 'no_date',
  // 已完成
  COMPLETED = 'completed',
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
  /** 截止日期 */
  dueDate: string
  /** 截止时间 */
  dueTime: string
  /** 优先级 */
  priority: Priority
  /** 特定操作 */
  operation: ReminderTaskOperation
}

/**
 * 查看指定过滤器的未完成任务数
 *
 * @param {ReminderFilterType} filter 过滤器类型
 *
 * @date 2024/12/27
 * @since 3.0.0
 */
export function countUncompletedTasks(filter: ReminderFilterType) {
  return requestForData<SingleNumberResponse>({
    method: 'get',
    url: `/todolist/filters/${filter}/count-uncompleted`,
    requireAuth: true,
  })
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
    url: '/todolist/projects',
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
    url: `/todolist/projects/${projectId}`,
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
    url: `/todolist/projects/${projectId}`,
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
    url: '/todolist/projects',
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
    url: '/todolist/tasks',
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
    url: `/todolist/tasks/${taskId}`,
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
    url: `/todolist/tasks/${taskId}`,
    requireAuth: true,
    data: dto,
  })
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
    url: `/todolist/tasks/${taskId}`,
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
    url: `/todolist/tasks`,
    params: {filter},
    requireAuth: true,
  })
}

/**
 * 以项目 ID 为条件，获取任务列表
 *
 * @param projectId 项目 ID
 *
 * @date 2024/12/26
 * @since 3.0.0
 */
export function getTasksByProjectId(projectId: number) {
  return requestForData<CommonListResponse<ReminderTask>>({
    method: 'get',
    url: `/todolist/tasks`,
    params: {project_id: projectId},
    requireAuth: true,
  })
}

/**
 * 设置截止期限
 *
 * @param taskId 待办任务 ID
 * @param dueDate 截止日期
 * @param dueTime 截止时间
 *
 * @date 2025/01/13
 * @since 3.0.0
 */
export function setDueDate(taskId: number, dueDate: string, dueTime?: string) {
  const dto: Partial<UpdateReminderTaskDTO> = {dueDate}
  if (dueTime) {
    dto.dueTime = dueTime
  }

  return updateTask(taskId, dto)
}

/**
 * 清除截止期限
 *
 * @param taskId 待办任务 ID
 *
 * @date 2025/01/13
 * @since 3.0.0
 */
export function clearDueDate(taskId: number) {
  return updateTask(taskId, {operation: ReminderTaskOperation.CLEAR_DUE_DATETIME})
}

/**
 * 完成任务
 *
 * @param taskId 待办任务 ID
 *
 * @date 2025/01/13
 * @since 3.0.0
 */
export function completeTask(taskId: number) {
  return updateTask(taskId, {operation: ReminderTaskOperation.COMPLETE})
}

/**
 * 取消完成任务
 *
 * @param taskId 待办任务 ID
 *
 * @date 2025/01/13
 * @since 3.0.0
 */
export function uncompleteTask(taskId: number) {
  return updateTask(taskId, {operation: ReminderTaskOperation.UNCOMPLETE})
}

/**
 * 移动任务至新的项目
 *
 * @param taskId 待办任务 ID
 * @param projectId 新的项目 ID
 *
 * @date 2025/01/16
 * @since 3.0.0
 */
export function moveTask(taskId: number, projectId: number) {
  return updateTask(taskId, {projectId})
}

/**
 * 修改任务名称
 *
 * @param taskId 待办任务 ID
 * @param name 新的任务名称
 *
 * @date 2025/01/18
 * @since 3.0.0
 */
export function updateTaskName(taskId: number, name: string) {
  return updateTask(taskId, {name})
}

/**
 * 修改任务描述内容
 *
 * @param taskId 待办任务 ID
 * @param content 新的任务描述内容
 *
 * @date 2025/01/18
 * @since 3.0.0
 */
export function updateTaskContent(taskId: number, content: string) {
  return updateTask(taskId, {content})
}

/**
 * 设置任务优先级
 *
 * @param taskId 待办任务 ID
 * @param priority 任务优先级
 *
 * @date 2025/01/21
 * @since 3.0.0
 */
export function setPriority(taskId: number, priority: Priority) {
  return updateTask(taskId, {priority})
}
