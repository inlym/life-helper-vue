<template>
  <!-- 任务的截止期限 -->
  <div class="flex items-center justify-between" @click.stop="">
    <a-popover trigger="click">
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
            <a-calendar :fullscreen="false" mode="month" />
          </div>
          <!-- 时间选择区域 -->
          <div class="mt-2">
            <a-time-picker class="w-full" @openChange="openChange" @panelChange="panelChange" />
          </div>
          <!-- 按钮区 -->
          <div class="mt-4 flex items-center justify-between gap-4">
            <a-button class="flex-1">清除</a-button>
            <a-button class="flex-1" type="primary">确定</a-button>
          </div>
        </div>
      </template>
      <!-- 入口区域 -->
      <div :class="textColor" class="cursor-pointer">
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
import {computed} from 'vue'
import {formatDate, formatDate2, formatTime, getDateColor} from '../services/date'
import MdiCalendarMonthOutline from '~icons/mdi/calendar-month-outline'
import QuillSun from '~icons/quill/sun'
import QuillSnoozeTomorrow from '~icons/quill/snooze-tomorrow'
import QuillCalendarAdd from '~icons/quill/calendar-add'
import QuillMoon from '~icons/quill/moon'
import {useHttp} from '@/hooks/useHttp'
import {clearDueDate, setDueDate} from '@/api/reminder'

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

// ===================================== 注册HTTP请求 =====================================

// 设置截止期限
const {data: data1, run: run1} = useHttp(setDueDate)

// 清空截止期限
const {data: data2, run: run2} = useHttp(clearDueDate)

// ===================================== 表单类数据 =====================================

// ===================================== 展示类数据 =====================================

const textColor = computed(() => (props.dueDate ? getDateColor(props.dueDate) : ''))
const dateText1 = computed(() => (props.dueDate ? formatDate2(props.dueDate) : ''))
const dateText2 = computed(() => (props.dueDate ? formatDate(props.dueDate) : ''))
const timeText = computed(() => (props.dueTime ? formatTime(props.dueTime) : ''))

// 2025-01-13 22:17:51
// 临时测试代码 --- start ---
function openChange(status: any) {
  console.log(status)
}

function panelChange(value: any, mode: any) {
  console.log(value, mode)
}
// 临时测试代码  --- end ---
</script>

<style scoped lang="scss"></style>
