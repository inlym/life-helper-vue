import {TaskFilter, type ReminderProject, type ReminderTask} from '@/api/reminder'
import {defineStore} from 'pinia'
import {ref} from 'vue'

/** 分类类型 */
export enum CategoryType {
  /** 待办项目，需配合 `projectId` 使用 */
  PROJECT = 'PROJECT',
  /** 过滤器 */
  FILTER = 'FILTER',
}

/** 任务列表组合 */
export interface TaskListGroup {
  /** 已完成任务列表 */
  completed: ReminderTask[]
  /** 未完成任务列表 */
  uncompleted: ReminderTask[]
}

export const useReminderStore = defineStore(
  'reminder',

  () => {
    /** 当前活跃的分类类型 */
    const activeCategoryType = ref<CategoryType>(CategoryType.FILTER)

    /** 当前活跃的过滤器 */
    const activeFilter = ref(TaskFilter.ALL_UNCOMPLETED)

    /** 当前活跃的项目 ID */
    const activeProjectId = ref(0)

    /** 当前活跃的任务列表组合 */
    const activeTaskListGroup = ref<TaskListGroup>({completed: [], uncompleted: []})

    /** 当前活跃的任务 ID */
    const activeTaskId = ref<number>()

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    return {activeCategoryType, activeFilter, activeProjectId, activeTaskListGroup, activeTaskId, projectList}
  },
)
