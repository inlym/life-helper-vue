<template>
  <!-- 右侧任务详情区域 -->
  <div class="flex h-full w-full flex-col">
    <!-- 有内容情况 -->
    <template v-if="rawTaskId && currentTask">
      <!-- 第一行 -->
      <div class="flex h-14 items-center border-b border-gray-300">
        <!-- 是否完成勾选框 -->
        <div class="flex h-full w-14 items-center justify-center border-r border-gray-300">
          <CompletedBox :task-id="currentTask.id" :complete-time="currentTask.completeTime" :priority="currentTask.priority" />
        </div>
        <!-- 截止时间操作按钮 -->
        <TaskDueDate type="button" :taskId="currentTask.id" :dueDate="currentTask.dueDate" :dueTime="currentTask.dueTime" />
        <div class="flex-1"></div>
        <TaskPriority class="mr-4" :task-id="currentTask.id" :priority="currentTask.priority" />
      </div>
      <!-- 第二行，任务标题 -->
      <div class="h-14 px-4 pt-4 pb-2">
        <!-- 任务名称输入框 -->
        <a-input
          v-model:value="currentTask.name"
          :bordered="false"
          :maxlength="50"
          class="text-xl font-bold"
          placeholder="准备做什么？"
          size="large"
          @change="onTaskNameChange"
        />
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
          @change="onTaskContentChange"
        />
      </div>
      <!-- 第四行，操作区 -->
      <div class="flex h-12 items-center justify-between border-t border-gray-300 px-4">
        <MoveTask :task-id="currentTask.id" :projectId="currentTask.projectId" />
        <a-popconfirm
          title="确定删除该任务吗？删除后将不可恢复"
          ok-text="删除"
          cancel-text="取消"
          :okButtonProps="{danger: true}"
          placement="topRight"
          @confirm="onDeleteButtonClick"
        >
          <div class="flex size-10 cursor-pointer items-center justify-center rounded-md hover:bg-gray-100">
            <MaterialSymbolsLightDeleteOutlineRounded class="size-6 text-red-500" />
          </div>
        </a-popconfirm>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {deleteTask, getTaskDetail, updateTaskContent, updateTaskName, type ReminderTask} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {useDebounceFn} from '@vueuse/core'
import {storeToRefs} from 'pinia'
import {useTemplateRef, watch} from 'vue'
import MaterialSymbolsLightDeleteOutlineRounded from '~icons/material-symbols-light/delete-outline-rounded'
import {reminderEventBus, useReminderStore} from '../reminder'
import CompletedBox from './CompletedBox.vue'
import MoveTask from './MoveTask.vue'
import TaskDueDate from './TaskDueDate.vue'
import TaskPriority from './TaskPriority.vue'

const contentInput = useTemplateRef<HTMLInputElement>('content-input')

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {rawTaskId, currentTask} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 请求[1]: 获取任务详情
const {run: run1} = useHttp(getTaskDetail, {onSuccess: onSuccess1})

// 请求[2]: 删除任务
const {runAsync: runAsync2} = useHttp(deleteTask, {onSuccess: onSuccess2})

// 请求[3]: 修改任务名称
const {run: run3} = useHttp(updateTaskName, {onSuccess: onSuccess3})

// 请求[4]: 修改任务描述内容
const {run: run4} = useHttp(updateTaskContent, {onSuccess: onSuccess3})

// =================================== 交互事件 ===================================

// 点击任务描述区域
function onContentBlockClick() {
  if (contentInput.value) {
    contentInput.value.focus()
  }
}

// 点击删除任务按钮
function onDeleteButtonClick() {
  if (currentTask.value) {
    return runAsync2(currentTask.value.id)
  }
}

// 处理[任务名称]输入框内容变化
const onTaskNameChange = useDebounceFn(() => {
  if (currentTask.value) {
    run3(currentTask.value.id, currentTask.value.name)
  }
}, 1000)

// 处理[任务描述]输入框内容变化
const onTaskContentChange = useDebounceFn(() => {
  if (currentTask.value) {
    run4(currentTask.value.id, currentTask.value.content)
  }
}, 1000)

// =================================== 请求回调 ===================================

/** 处理[获取任务详情]请求成功情况 */
function onSuccess1(res: ReminderTask) {
  currentTask.value = res
  reminderStore.syncTask(res)
}

/** 处理[删除任务]请求成功情况 */
function onSuccess2() {
  reminderEventBus.emit({refreshAll: true})
  currentTask.value = undefined
  reminderStore.goToTask(0)
}

/** 处理[修改任务名称和描述内容]请求成功情况 */
function onSuccess3(res: ReminderTask) {
  reminderStore.syncTask(res)
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
