import {ReminderFilterType, type ReminderProject, type ReminderTask} from '@/api/reminder'
import dayjs from 'dayjs'
import mitt from 'mitt'
import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

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

    // ================================ 对话框组件状态及数据传递 ================================

    /** 对话框1: 新增项目 */
    const dialog1 = ref({
      /** 对话框是否打开 */
      open: false,
    })

    /** 对话框2: 重命名项目 */
    const dialog2 = ref({
      /** 对话框是否打开 */
      open: false,

      /** 当前的项目名称 */
      name: '',
    })

    // ==================================== 跨组件共享数据 ====================================

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    /** 当前活跃的任务列表 */
    const taskList = ref<ReminderTask[]>([])

    /** 当前活跃的任务（右侧任务详情部分） */
    const currentTask = ref<ReminderTask>()

    return {
      rawProjectId,
      rawTaskId,
      projectList,
      taskList,
      currentTask,
      dialog1,
      dialog2,
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
