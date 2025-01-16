import {ReminderFilterType, type ReminderProject, type ReminderTask} from '@/api/reminder'
import {useEventBus} from '@vueuse/core'
import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

export interface ReminderEventBus {
  /** 是否需要全部刷新 */
  refreshAll?: boolean
  /** 是否需要刷新过滤器列表数据 */
  refreshFilterList?: boolean
  /** 是否需要刷新项目列表数据 */
  refreshProjectList?: boolean
  /** 是否需要刷新任务列表数据 */
  refreshTaskList?: boolean
}

export const reminderEventBus = useEventBus<ReminderEventBus>('reminder-bus')

export const useReminderStore = defineStore(
  'reminder',

  () => {
    const route = useRoute()
    const router = useRouter()

    // ================================ 路由参数处理 ================================

    const rawProjectId = computed(() => route.params.projectId as string)
    const rawTaskId = computed(() => route.params.taskId as string)

    function goToProject(projectId: number) {
      router.push({name: 'reminder', params: {projectId: `${projectId}`}})
    }

    function goToFilter(filter: ReminderFilterType) {
      router.push({name: 'reminder', params: {projectId: `filter-${filter}`}})
    }

    function goToTask(taskId: number) {
      if (taskId > 0) {
        router.push({name: 'reminder', params: {projectId: rawProjectId.value, taskId: `${taskId}`}})
      } else {
        router.push({name: 'reminder', params: {projectId: rawProjectId.value}})
      }
    }

    // ============================= 对话框组件状态及数据传递 =============================

    /** 对话框1: 新增项目 */
    const dialog1 = ref({
      /** 对话框是否打开 */
      open: false,
    })

    /** 对话框2: 重命名项目 */
    const dialog2 = ref({
      /** 对话框是否打开 */
      open: false,
      /** 当前的项目 ID */
      projectId: 0,
      /** 当前的项目名称 */
      name: '',
    })

    /** 打开对话框2 */
    function openDialog2(projectId: number, name: string) {
      dialog2.value.projectId = projectId
      dialog2.value.name = name
      dialog2.value.open = true
    }

    // =============================== 跨组件共享数据 ================================

    /** 项目列表 */
    const projectList = ref<ReminderProject[]>([])

    /** 当前活跃的任务列表 */
    const taskList = ref<ReminderTask[]>([])

    /** 当前活跃的任务（右侧任务详情部分） */
    const currentTask = ref<ReminderTask>()

    /** 同步任务数据 */
    function syncTask(task: ReminderTask) {
      if (currentTask.value && currentTask.value.id === task.id) {
        currentTask.value = task
      }
      if (taskList.value.length > 0) {
        const index = taskList.value.findIndex((item) => item.id === task.id)
        if (index !== -1) {
          taskList.value[index] = task
        }
      }
    }

    // ================================ 其他元素状态 ================================

    /** 左栏是否展示 */
    const leftColumnShow = ref(true)

    return {
      rawProjectId,
      rawTaskId,
      goToProject,
      goToFilter,
      goToTask,

      dialog1,
      dialog2,
      openDialog2,

      projectList,
      taskList,
      currentTask,
      syncTask,

      leftColumnShow,
    }
  },
)
