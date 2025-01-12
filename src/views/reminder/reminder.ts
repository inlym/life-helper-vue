import {ReminderFilterType, type ReminderProject, type ReminderTask} from '@/api/reminder'
import dayjs from 'dayjs'
import mitt from 'mitt'
import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useRoute} from 'vue-router'

type ReminderEvents = {
  projectChanged: number
  taskChanged: number
}

export const reminderEmitter = mitt<ReminderEvents>()

export const useReminderStore = defineStore(
  'reminder',

  () => {
    const route = useRoute()

    // ===================================== 原始路由参数 =====================================

    const rawProjectId = computed(() => route.params.projectId as string)
    const rawTaskId = computed(() => route.params.taskId as string)

    // ================================== 对话框组件启用状态 ==================================

    /** 新增项目对话框 */
    const addProjectDialogOpen = ref(false)

    // ===================================== 跨组件共享数据 =====================================

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    return {
      rawProjectId,
      rawTaskId,
      addProjectDialogOpen,
      projectList,
    }
  },
)

/**
 * 获取过滤器名称
 *
 * @param filter 过滤器
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getFilterName(filter: ReminderFilterType) {
  switch (filter) {
    case ReminderFilterType.ALL:
      return '所有'
    case ReminderFilterType.INBOX:
      return '收集箱'
    case ReminderFilterType.TODAY:
      return '今天'
    case ReminderFilterType.NEXT_SEVEN_DAYS:
      return '最近7天'
    case ReminderFilterType.OVERDUE:
      return '已过期'
    case ReminderFilterType.NO_DATE:
      return '无期限'
    case ReminderFilterType.COMPLETED:
      return '已完成'
    default:
      return ''
  }
}

/**
 * 获取 [已完成] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getCompletedTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !!task.completeTime)
}

/**
 * 获取 [无期限] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getNoDateTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !task.completeTime).filter((task) => !task.dueDate)
}

/**
 * 获取 [已过期] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getOverdueTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !task.completeTime).filter((task) => task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day'))
}

/**
 * 获取 [今天] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getTodayTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !task.completeTime).filter((task) => task.dueDate && dayjs(task.dueDate).isSame(dayjs(), 'day'))
}

/**
 * 获取 [明天] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getTomorrowTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !task.completeTime).filter((task) => task.dueDate && dayjs(task.dueDate).isSame(dayjs().add(1, 'day'), 'day'))
}

/**
 * 获取 [最近7天] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getNext7DaysTaskGroup(taskList: ReminderTask[]) {
  return taskList
    .filter((task) => !task.completeTime)
    .filter((task) => task.dueDate && dayjs(task.dueDate).isBefore(dayjs().add(7, 'day'), 'day') && dayjs(task.dueDate).isAfter(dayjs().add(1, 'day'), 'day'))
}

/**
 * 获取 [未来] 任务分组
 *
 * @param taskList 原始任务列表
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getLaterTaskGroup(taskList: ReminderTask[]) {
  return taskList.filter((task) => !task.completeTime).filter((task) => task.dueDate && dayjs(task.dueDate).isAfter(dayjs().add(7, 'day'), 'day'))
}

export interface TaskGroup {
  name: string
  list: ReminderTask[]
}

export function getTaskGroupList(taskList: ReminderTask[]) {
  const result: TaskGroup[] = []

  const list1 = getOverdueTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '已过期', list: list1})
  }

  const list2 = getTodayTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '今天', list: list2})
  }

  const list3 = getTomorrowTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '明天', list: list3})
  }

  const list4 = getNext7DaysTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '最近7天', list: list4})
  }

  const list5 = getLaterTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '未来', list: list5})
  }

  const list6 = getNoDateTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '无期限', list: list6})
  }

  const list7 = getCompletedTaskGroup(taskList)
  if (list1.length > 0) {
    result.push({name: '已完成', list: list7})
  }
}
