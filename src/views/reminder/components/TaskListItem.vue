<template>
  <!-- 单个任务列表项 -->
  <div
    :class="{'bg-gray-100': isActived}"
    class="task-list-item flex h-10 items-center justify-between gap-1 rounded-md px-2 hover:bg-gray-100"
    @click="onItemClick"
  >
    <CompletedBox :task-id="task.id" v-model:complete-time="task.completeTime" :priority="task.priority" />
    <div class="ml-1 flex h-full flex-1 items-center border-b border-gray-100">
      <!-- 任务名称 -->
      <a-typography-text class="flex-1" :class="{'text-gray-400': completed}" v-model:content="task.name" ellipsis />
      <!-- 所属项目名称 -->
      <a-tag
        v-if="task.projectName && activeCategory !== 'project'"
        class="flex max-w-28 cursor-pointer items-center py-0.5"
        @click.stop="onProjectClick(task.projectId)"
      >
        <a-typography-text class="text-xs" :class="{'text-gray-400': completed}" v-model:content="task.projectName" ellipsis />
      </a-tag>
      <!-- 截止期限 -->
      <TaskDueDate type="text" :task-id="task.id" :dueDate="task.dueDate" :due-time="task.dueTime" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type Task} from '@/api/todolist'
import {computed, ref, watch} from 'vue'
import {useReminderStore} from '../reminder'
import CompletedBox from './CompletedBox.vue'
import TaskDueDate from './TaskDueDate.vue'
import {storeToRefs} from 'pinia'

// =================================== 组件入参 ===================================

const props = defineProps<Task>()

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {rawTaskId, activeCategory} = storeToRefs(reminderStore)

// ================================== 展示类数据 ===================================

const task = ref<Task>(props)

const completed = computed(() => Boolean(task.value.completeTime))

// =================================== 元素状态 ===================================

const isActived = computed(() => props.id === Number.parseInt(rawTaskId.value))

// =================================== 交互事件 ===================================

/** 点击[项目名称]标签 */
function onProjectClick(projectId: number) {
  reminderStore.goToProject(projectId)
}

/** 点击列表项 */
function onItemClick() {
  reminderStore.goToTask(task.value.id)
}

// =================================== 事件监听 ===================================

watch(
  () => props,
  (val) => {
    task.value = val
  },
)
</script>

<style lang="scss" scoped></style>
