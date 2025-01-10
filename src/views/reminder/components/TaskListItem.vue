<template>
  <!-- 单个任务列表项 -->
  <div class="task-list-item flex h-10 items-center justify-between rounded-md px-2 hover:bg-gray-100">
    <CompletedBox :completed="Boolean(props.completeTime)" />
    <!-- 任务名称 -->
    <div class="ml-1 flex h-full flex-1 items-center border-b border-gray-100">
      <a-typography-text v-model:content="props.name" ellipsis />
    </div>
    <!-- 所属项目名称 -->
    <a-tag v-if="props.projectName" class="max-w-28 cursor-pointer" @click.stop="onProjectClick(props.projectId)">
      <a-typography-text v-model:content="props.projectName" ellipsis />
    </a-tag>
  </div>
</template>

<script lang="ts" setup>
import {type ReminderTask} from '@/api/reminder'
import CompletedBox from './CompletedBox.vue'
import {useRouter} from 'vue-router'

const router = useRouter()

const props = defineProps<ReminderTask>()

function onProjectClick(id: number) {
  router.push({name: 'reminder', params: {projectId: id}})
}
</script>

<style lang="scss" scoped></style>
