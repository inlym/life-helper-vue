<template>
  <!-- 右侧任务详情区域 -->
  <div class="flex h-full w-full flex-col">
    <!-- 有内容情况 -->
    <template v-if="rawTaskId && currentTask">
      <!-- 第一行 -->
      <div class="flex h-14 items-center border-b">
        <!-- 是否完成勾选框 -->
        <div class="flex h-full w-14 items-center justify-center border-r">
          <CompletedBox :task-id="currentTask.id" v-model:complete-time="currentTask.completeTime" />
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
      <div class="flex h-12 items-center justify-between border-t px-4">
        <MoveTask :task-id="currentTask.id" :projectId="currentTask.projectId" />
        <div class="flex size-10 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100" @click="onDeleteTaskClick">
          <MaterialSymbolsLightDeleteOutlineRounded class="size-6 text-red-500" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {deleteTask, getTaskDetail, type ReminderTask} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {storeToRefs} from 'pinia'
import {useTemplateRef, watch} from 'vue'
import {reminderEventBus, useReminderStore} from '../reminder'
import CompletedBox from './CompletedBox.vue'
import TaskDueDate from './TaskDueDate.vue'
import MoveTask from './MoveTask.vue'
import MaterialSymbolsLightDeleteOutlineRounded from '~icons/material-symbols-light/delete-outline-rounded'
import {Modal} from 'ant-design-vue'

const contentInput = useTemplateRef<HTMLInputElement>('content-input')

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {rawTaskId, currentTask} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 请求[1]: 获取任务详情
const {run: run1} = useHttp(getTaskDetail, {onSuccess: onSuccess1})

// 请求[2]: 删除任务
const {run: run2, loading: loading2} = useHttp(deleteTask, {onSuccess: onSuccess2})

// =================================== 交互事件 ===================================

// 点击任务描述区域
function onContentBlockClick() {
  if (contentInput.value) {
    contentInput.value.focus()
  }
}

// 点击删除任务按钮
function onDeleteTaskClick() {
  Modal.confirm({
    title: '提示',
    content: '确定删除该任务吗？删除后将不可恢复',
    okText: '删除',
    cancelText: '取消',
    maskClosable: true,
    okButtonProps: {loading: loading2.value},
    onOk: () => {
      if (currentTask.value) {
        run2(currentTask.value.id)
      }
    },
  })
}

// =================================== 请求回调 ===================================

/** 处理[获取任务详情]请求成功情况 */
function onSuccess1(res: ReminderTask) {
  currentTask.value = res
}

/** 处理[删除任务]请求成功情况 */
function onSuccess2() {
  reminderEventBus.emit({refreshAll: true})
  currentTask.value = undefined
  reminderStore.goToTask(0)
}

// =================================== 事件监听 ===================================

watch(
  rawTaskId,
  (newTaskId: string) => {
    if (newTaskId) {
      run1(Number.parseInt(newTaskId))
    } else {
      currentTask.value = undefined
    }
  },
  {immediate: true},
)
</script>

<style lang="scss" scoped></style>
