<template>
  <!-- 单个任务列表项 -->
  <div class="task-item flex h-10 items-center justify-between px-4">
    <TaskCompletedBox :completed="props.completeTime" :task-id="props.id" />
    <a-typography-text class="ml-2 flex-1" v-model:content="props.name" ellipsis />
  </div>
</template>

<script setup lang="ts">
import {type ReminderTask} from '@/api/reminder'
import TaskCompletedBox from './TaskCompletedBox.vue'

const props = defineProps<ReminderTask>()
</script>

<style scoped lang="scss"></style>
