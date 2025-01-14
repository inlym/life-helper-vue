<template>
  <!-- 右侧任务详情区域 -->
  <div class="flex h-full w-full flex-col">
    <!-- 有内容情况 -->
    <template v-if="rawTaskId && currentTask">
      <!-- 第一行 -->
      <div class="flex h-14 items-center border-b">
        <!-- 是否完成勾选框 -->
        <div class="flex h-full w-14 items-center justify-center border-r">
          <CompletedBox :completed="Boolean(currentTask.completeTime)" />
        </div>
        <!-- 截止时间操作按钮 -->
        <TaskDueDate type="button" :taskId="currentTask.id" :dueDate="currentTask.dueDate" :dueTime="currentTask.dueTime" />
      </div>
      <!-- 第二行，任务标题 -->
      <div class="h-14 px-4 pb-2 pt-4">
        <!-- 任务名称输入框 -->
        <a-input v-model:value="currentTask.name" :bordered="false" :maxlength="50" class="text-xl font-bold" placeholder="准备做什么？" size="large" />
      </div>
      <!-- 第三行，任务描述 -->
      <div class="flex-1 px-4" @click="onContentBlockClick">
        <a-textarea
          ref="content-input"
          v-model:value="currentTask.content"
          :bordered="false"
          :maxlength="1000"
          autoSize
          class="h-96 text-base"
          placeholder="输入任务描述"
        />
      </div>
      <!-- 第四行，操作区 -->
      <div class="flex h-12 items-center border-t px-4">
        <div class="flex cursor-pointer items-center rounded-md px-4 py-2 hover:bg-gray-100">
          <div>{{ currentTask.projectName || '未分类' }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {getTaskDetail, type ReminderTask} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {storeToRefs} from 'pinia'
import {useTemplateRef, watch} from 'vue'
import {useReminderStore} from '../reminder'
import CompletedBox from './CompletedBox.vue'
import TaskDueDate from './TaskDueDate.vue'

const contentInput = useTemplateRef<HTMLInputElement>('content-input')

// ===================================== 共享类数据 =====================================

const {rawProjectId, rawTaskId, taskList, currentTask} = storeToRefs(useReminderStore())

// ===================================== 注册HTTP请求 =====================================

// 获取任务详情
const {data, run} = useHttp(getTaskDetail, {onSuccess})

// ===================================== 交互事件 =====================================

// 点击任务描述区域
function onContentBlockClick() {
  if (contentInput.value) {
    contentInput.value.focus()
  }
}

// ===================================== 请求回调 =====================================

function onSuccess(res: ReminderTask) {
  currentTask.value = res
}

// ===================================== 事件监听 =====================================

watch(
  rawTaskId,
  (newTaskId: string) => {
    if (newTaskId) {
      run(Number.parseInt(newTaskId))
    } else {
      currentTask.value = undefined
    }
  },
  {immediate: true},
)
</script>

<style lang="scss" scoped></style>
