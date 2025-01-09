<template>
  <!-- 任务列表头部区域 -->
  <div class="flex h-10 items-center">
    <a-typography-title class="flex-1" :level="4" :content="title" ellipsis />
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {getFilterName, useReminderStore} from '../reminder'
import {computed} from 'vue'
import type {ReminderFilterType} from '@/api/reminder'

// ===================================== 全局状态管理 =====================================

const {rawProjectId, projectList} = storeToRefs(useReminderStore())

// ===================================== 页面展示数据 =====================================

const title = computed(() => {
  if (rawProjectId.value.startsWith('filter-')) {
    const filter = rawProjectId.value.replace('filter-', '') as ReminderFilterType
    return getFilterName(filter)
  }

  const id = Number.parseInt(rawProjectId.value)
  const project = projectList.value.find((p) => p.id === id)
  return project ? project.name : ''
})
</script>

<style scoped lang="scss"></style>
