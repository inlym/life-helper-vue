<template>
  <!-- 单个任务列表项 -->
  <div class="task-item flex h-10 items-center justify-between rounded-md px-4 hover:bg-gray-100">
    <CompletedBox :completed="Boolean(props.completeTime)" />
    <div class="flex h-full flex-1 items-center border-b border-gray-100">
      <a-typography-text v-model:content="props.name" class="ml-2 flex-1" ellipsis />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {type ReminderTask} from '@/api/reminder'
import CompletedBox from './CompletedBox.vue'

const props = defineProps<ReminderTask>()
</script>

<style lang="scss" scoped></style>
