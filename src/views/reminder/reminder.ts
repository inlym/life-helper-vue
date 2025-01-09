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

    // 原始路由参数
    const rawProjectId = computed(() => route.params.projectId as string)
    const rawTaskId = computed(() => route.params.taskId as string)

    // 对话框组件启用状态（对话框组件全部挂载到页面级组件上）

    /** 新增项目对话框 */
    const addProjectDialogOpen = ref(false)

    return {
      rawProjectId,
      rawTaskId,
      addProjectDialogOpen,
    }
  },
)
