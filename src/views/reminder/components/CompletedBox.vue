<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click.stop="onClick">
    <MaterialSymbolsCheckBoxRounded v-if="completeTime" class="size-6 text-gray-300" />
    <MaterialSymbolsCheckBoxOutlineBlank v-else class="size-6 text-gray-400" />
  </div>
</template>

<script lang="ts" setup>
import {completeTask, uncompleteTask, type ReminderTask} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import dayjs from 'dayjs'
import {storeToRefs} from 'pinia'
import MaterialSymbolsCheckBoxOutlineBlank from '~icons/material-symbols/check-box-outline-blank'
import MaterialSymbolsCheckBoxRounded from '~icons/material-symbols/check-box-rounded'
import {reminderEventBus, useReminderStore} from '../reminder'

// =================================== 组件入参 ===================================

/** 任务完成时间 */
const completeTime = defineModel<string | undefined>('completeTime', {required: true})

const props = defineProps({
  /** 待办任务 ID */
  taskId: {type: Number, required: true},
})

// ================================== 跨组件数据 ===================================

const {taskList, currentTask} = storeToRefs(useReminderStore())

// ================================= 注册HTTP请求 =================================

// 完成任务
const {run: run1} = useHttp(completeTask, {onSuccess})

// 取消完成任务
const {run: run2} = useHttp(uncompleteTask, {onSuccess})

// =================================== 交互事件 ===================================

function onClick() {
  if (completeTime.value) {
    // [取消完成]操作
    completeTime.value = undefined
    run2(props.taskId)
  } else {
    // [完成]操作
    completeTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    run1(props.taskId)
  }
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: ReminderTask) {
  // 如果是当前选中的任务，则直接更新
  if (currentTask.value && currentTask.value.id === res.id) {
    currentTask.value = res
  }

  // 更新任务列表中的数据
  const t = taskList.value.find((item) => item.id === res.id)!
  if (t) {
    t.completeTime = res.completeTime
  }

  reminderEventBus.emit({refreshAll: true})
}
</script>

<style lang="scss" scoped></style>
