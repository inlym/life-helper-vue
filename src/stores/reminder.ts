import {ReminderFilterType, type ReminderProject, type ReminderTask} from '@/api/reminder'
import {defineStore} from 'pinia'
import {ref} from 'vue'

/** 分类类型 */
export enum CategoryType {
  /** 待办项目 */
  PROJECT = 'PROJECT',
  /** 过滤器 */
  FILTER = 'FILTER',
}

export const useReminderStore = defineStore(
  'reminder',

  () => {
    // 2025-01-09 13:14:29
    // 临时测试代码 --- start ---
    /** 当前活跃的分类类型 */
    const activeCategoryType = ref<CategoryType>(CategoryType.FILTER)

    /** 当前活跃的过滤器类型 */
    const activeFilterType = ref<ReminderFilterType>()

    /** 当前活跃的过滤器 */
    const activeFilter = ref<ReminderFilterType>()

    /** 当前活跃的项目 ID */
    const activeProjectId = ref<number>()

    /** 当前活跃的项目 */
    const activeProject = ref<ReminderProject>()

    /** 当前活跃的任务 ID */
    const activeTaskId = ref<number>()

    /** 更新次数，组件内监听该值变化用于触发组件数据更新 */
    const updateCount = ref(0)

    function update() {
      updateCount.value += 1
    }

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    // 临时测试代码  --- end ---

    return {
      activeCategoryType,
      activeFilterType,
      activeFilter,
      activeProjectId,
      activeProject,
      activeTaskId,
      updateCount,
      projectList,
      update,
    }
  },
)
