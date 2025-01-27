<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-8 w-8 cursor-pointer items-center justify-center" @click.stop="onClick">
    <MaterialSymbolsCheckBoxRounded v-if="props.completeTime" class="size-6 text-gray-300" />
    <MaterialSymbolsCheckBoxOutlineBlank v-else class="size-6" :class="color" />
  </div>
</template>

<script lang="ts" setup>
import {completeTask, Priority, uncompleteTask, type Task} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {computed} from 'vue'
import MaterialSymbolsCheckBoxOutlineBlank from '~icons/material-symbols/check-box-outline-blank'
import MaterialSymbolsCheckBoxRounded from '~icons/material-symbols/check-box-rounded'
import {reminderEventBus, useReminderStore} from '../reminder'

// =================================== 组件入参 ===================================

const props = defineProps({
  /** 待办任务 ID */
  taskId: {type: Number, required: true},
  /** 任务完成时间 */
  completeTime: {type: String, required: false},
  /** 任务优先级 */
  priority: {type: Number, required: false},
})

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()

// ================================= 注册HTTP请求 =================================

// 完成任务
const {run: run1} = useHttp(completeTask, {onSuccess})

// 取消完成任务
const {run: run2} = useHttp(uncompleteTask, {onSuccess})

// ================================== 展示类数据 ===================================

const color = computed(() => {
  if (props.priority === Priority.HIGH) {
    return 'text-red-500'
  } else if (props.priority === Priority.MEDIUM) {
    return 'text-yellow-500'
  } else if (props.priority === Priority.LOW) {
    return 'text-blue-500'
  } else {
    return 'text-gray-500'
  }
})

// =================================== 交互事件 ===================================

function onClick() {
  if (props.completeTime) {
    // [取消完成]操作
    run2(props.taskId)
  } else {
    // [完成]操作
    run1(props.taskId)
  }
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: Task) {
  reminderStore.syncTask(res)
  reminderEventBus.emit({refreshAll: true})
}
</script>

<style lang="scss" scoped></style>
