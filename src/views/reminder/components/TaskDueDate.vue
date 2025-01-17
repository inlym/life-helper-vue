<template>
  <!-- 任务的截止期限 -->
  <div class="flex items-center justify-between" @click.stop="">
    <a-popover trigger="click" :open>
      <template #content>
        <!-- 弹出框中的内容 -->
        <div class="flex w-64 flex-col p-1">
          <!-- 快捷设置日期区域 -->
          <div class="bg-gray-50 p-4">
            <div class="text-gray-500">快捷设置</div>
            <!-- 按钮操作区 -->
            <div class="mt-4 flex items-center justify-between">
              <a-tooltip>
                <template #title>今天</template>
                <div class="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200">
                  <QuillSun class="size-7 text-gray-600" />
                </div>
              </a-tooltip>
              <a-tooltip>
                <template #title>明天</template>
                <div class="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200">
                  <QuillSnoozeTomorrow class="size-7 text-gray-600" />
                </div>
              </a-tooltip>
              <a-tooltip>
                <template #title>下周</template>
                <div class="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200">
                  <QuillCalendarAdd class="size-7 text-gray-600" />
                </div>
              </a-tooltip>
              <a-tooltip>
                <template #title>下月</template>
                <div class="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200">
                  <QuillMoon class="size-7 text-gray-600" />
                </div>
              </a-tooltip>
            </div>
          </div>
          <!-- 日历操作区域 -->
          <div class="mt-2">
            <a-calendar v-model:value="dueDate" :fullscreen="false" mode="month" />
          </div>
          <!-- 时间选择区域 -->
          <div class="mt-2">
            <a-time-picker v-model:value="dueTime" class="w-full" />
          </div>
          <!-- 按钮区 -->
          <div class="mt-4 flex items-center justify-between gap-4">
            <a-button class="flex-1" @click="clear">清除</a-button>
            <a-button class="flex-1" type="primary" :disabled="btn1Disabled" @click="submit">确定</a-button>
          </div>
        </div>
      </template>
      <!-- 入口区域 -->
      <div :class="textColor" class="cursor-pointer" @click="open = true">
        <div class="mx-2 flex items-center justify-between rounded-md px-2 py-1 hover:bg-gray-100" v-if="props.type === 'button'">
          <MdiCalendarMonthOutline />
          <div class="ml-2 flex items-center justify-between text-sm">
            <div v-if="dueDate">{{ dateText1 + (timeText ? `, ${timeText}` : '') }}</div>
            <div v-else class="ml-2 text-gray-400">设置截止时间</div>
          </div>
        </div>
        <div class="mx-1 p-1 text-xs" v-if="props.type === 'text' && props.dueDate">{{ dateText2 }}</div>
      </div>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {formatDate, formatDate2, formatTime, getDateColor} from '../services/date'
import MdiCalendarMonthOutline from '~icons/mdi/calendar-month-outline'
import QuillSun from '~icons/quill/sun'
import QuillSnoozeTomorrow from '~icons/quill/snooze-tomorrow'
import QuillCalendarAdd from '~icons/quill/calendar-add'
import QuillMoon from '~icons/quill/moon'
import {useHttp} from '@/hooks/useHttp'
import {clearDueDate, setDueDate, type ReminderTask} from '@/api/reminder'
import dayjs, {Dayjs} from 'dayjs'
import {reminderEventBus, useReminderStore} from '../reminder'
import {storeToRefs} from 'pinia'

// =================================== 组件入参 ===================================

interface TaskDueDateProps {
  /** 展示类型：按钮或文字 */
  type: 'button' | 'text'
  /** 任务 ID */
  taskId: number
  /** 截止期限的日期部分 */
  dueDate?: string
  /** 截止期限的时间部分 */
  dueTime?: string
}

const props = defineProps<TaskDueDateProps>()

// ================================== 跨组件数据 ===================================

const {rawTaskId, currentTask} = storeToRefs(useReminderStore())

// ================================= 注册HTTP请求 =================================

// 设置截止期限
const {data: data1, run: run1} = useHttp(setDueDate, {onSuccess})

// 清空截止期限
const {data: data2, run: run2} = useHttp(clearDueDate, {onSuccess})

// ================================== 表单类数据 ===================================

const dueDate = ref<Dayjs>()
const dueTime = ref<Dayjs>()

// ================================== 展示类数据 ===================================
// ================================== 展示类数据 ===================================

const textColor = computed(() => (props.dueDate ? getDateColor(props.dueDate) : ''))
const dateText1 = computed(() => (props.dueDate ? formatDate2(props.dueDate) : ''))
const dateText2 = computed(() => (props.dueDate ? formatDate(props.dueDate) : ''))
const timeText = computed(() => (props.dueTime ? formatTime(props.dueTime) : ''))

// =================================== 元素状态 ===================================

// [确定]按钮是否禁用
const btn1Disabled = computed(() => !dueDate.value)

// 整个浮层是否打开
const open = ref(false)

// =================================== 交互事件 ===================================

function clear() {
  const taskId = props.taskId
  run2(taskId)
}

function submit() {
  const taskId = props.taskId
  if (dueDate.value) {
    const dueDateStr = dueDate.value.format('YYYY-MM-DD')
    if (dueTime.value) {
      const dueTimeStr = dueTime.value.format('HH:mm:ss')
      run1(taskId, dueDateStr, dueTimeStr)
    } else {
      run1(taskId, dueDateStr)
    }
  }
}

// =================================== 请求回调 ===================================

function onSuccess(res: ReminderTask) {
  if (props.taskId === res.id) {
    currentTask.value = res
  }
  reminderEventBus.emit({refreshFilterList: true, refreshProjectList: true, refreshTaskList: true})
  open.value = false
}

// =================================== 事件监听 ===================================

watch(
  () => [props.dueDate, props.dueTime],
  ([dueDateNew, dueTimeNew]) => {
    dueDate.value = dueDateNew ? dayjs(dueDateNew) : undefined
    dueTime.value = dueTimeNew ? dayjs(dueTimeNew, 'HH:mm:ss') : undefined
  },
  {immediate: true},
)
</script>

<style scoped lang="scss"></style>
