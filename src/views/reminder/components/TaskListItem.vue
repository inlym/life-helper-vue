<template>
  <!-- 单个任务列表项 -->
  <div class="task-item flex h-10 items-center justify-between px-4">
    <CompletedBox :completed="props.completeTime" :task-id="props.id" />
    <a-typography-text v-model:content="props.name" class="ml-2 flex-1" ellipsis />
  </div>
</template>

<script lang="ts" setup>
import {type ReminderTask} from '@/api/reminder'
import CompletedBox from './CompletedBox.vue'

const props = defineProps<ReminderTask>()
</script>

<style lang="scss" scoped></style>
