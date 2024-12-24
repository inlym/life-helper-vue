import type {ReminderProject, ReminderTask} from '@/api/reminder'
import {defineStore} from 'pinia'
import {ref} from 'vue'

/** 待办任务过滤器 */
export enum TaskFilter {
  /** 所有待办 */
  AllUncompleted = 'all_uncompleted',
  /** 所有已完成 */
  AllCompleted = 'all_completed',
  /** 今日 */
  Today = 'today',
  /** 已过期 */
  Expired = 'expired',
  /** 无期限 */
  Undated = 'undated',
}

/** 分类类型 */
export enum CategoryType {
  /** 待办项目，需配合 `projectId` 使用 */
  Project = 'project',
  /** 过滤器 */
  Filter = 'filter',
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
    const activeCategoryType = ref<CategoryType>(CategoryType.Filter)

    /** 当前活跃的过滤器 */
    const activeFilter = ref(TaskFilter.AllUncompleted)

    /** 当前活跃的项目 ID */
    const activeProjectId = ref(0)

    /** 当前活跃的任务列表组合 */
    const activeTaskListGroup = ref<TaskListGroup>({completed: [], uncompleted: []})

    /** 当前活跃的任务 */
    const activeTask = ref<ReminderTask>()

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    return {activeCategoryType, activeFilter, activeProjectId, activeTaskListGroup, activeTask, projectList}
  },
)
