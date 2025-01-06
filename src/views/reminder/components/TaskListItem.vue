<template>
  <!-- 单个任务列表项 -->
  <div class="task-item flex h-10 items-center justify-between px-4">
    <CompletedBox :completed="!!props.completeTime" />
    <a-typography-text class="ml-2 flex-1" v-model:content="props.name" ellipsis />
  </div>
</template>

<script setup lang="ts">
import {type ReminderTask} from '@/api/reminder'
import CompletedBox from './CompletedBox.vue'

const props = defineProps<Partial<ReminderTask>>()
</script>

<style scoped lang="scss"></style>
