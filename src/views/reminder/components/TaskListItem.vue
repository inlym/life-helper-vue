<template>
  <!-- 单个任务列表项 -->
  <div class="task-list-item flex h-10 items-center justify-between rounded-md px-2 hover:bg-gray-100" @click="onItemClick">
    <CompletedBox :task-id="task.id" v-model:complete-time="task.completeTime" />
    <div class="ml-1 flex h-full flex-1 items-center border-b border-gray-100">
      <!-- 任务名称 -->
      <a-typography-text class="flex-1" :class="{'text-gray-400': completed}" v-model:content="props.name" ellipsis />
      <!-- 所属项目名称 -->
      <a-tag v-if="props.projectName" class="flex max-w-28 cursor-pointer items-center py-0.5" @click.stop="onProjectClick(props.projectId)">
        <a-typography-text class="text-xs" :class="{'text-gray-400': completed}" v-model:content="props.projectName" ellipsis />
      </a-tag>
      <!-- 截止期限 -->
      <TaskDueDate type="text" :task-id="props.id" :dueDate="props.dueDate" :due-time="props.dueTime" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type ReminderTask} from '@/api/reminder'
import {computed, ref, watch} from 'vue'
import {useReminderStore} from '../reminder'
import CompletedBox from './CompletedBox.vue'
import TaskDueDate from './TaskDueDate.vue'

const props = defineProps<ReminderTask>()

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()

// ===================================== 展示类数据 =====================================

const task = ref<ReminderTask>(props)

const completed = computed(() => Boolean(task.value.completeTime))

// ===================================== 交互事件 =====================================

function onProjectClick(projectId: number) {
  reminderStore.goToProject(projectId)
}

function onItemClick() {
  reminderStore.goToTask(task.value.id)
}

// ===================================== 事件监听 =====================================

watch(
  () => props,
  (val) => {
    task.value = val
  },
)
</script>

<style lang="scss" scoped></style>
