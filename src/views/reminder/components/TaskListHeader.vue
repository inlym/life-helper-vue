<template>
  <!-- 任务列表头部区域 -->
  <div class="flex h-10 items-center gap-2">
    <div class="flex size-8 cursor-pointer items-center justify-between rounded-md p-0.5 hover:bg-gray-200">
      <LineMdMenuUnfoldLeft v-if="leftColumnShow" class="text-xl text-gray-700" @click="leftColumnShow = false" />
      <LineMdMenuUnfoldRight v-else class="text-xl text-gray-700" @click="leftColumnShow = true" />
    </div>

    <div class="flex flex-1 items-center">
      <a-typography-text class="text-xl font-bold" :content="title" ellipsis />
    </div>
  </div>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import {useReminderStore} from '../reminder'
import {computed} from 'vue'
import type {ReminderFilterType} from '@/api/todolist'
import {getFilterName} from '../services/filter'
import LineMdMenuUnfoldRight from '~icons/line-md/menu-unfold-right'
import LineMdMenuUnfoldLeft from '~icons/line-md/menu-unfold-left'

// ================================== 跨组件数据 ===================================

const {rawProjectId, projectList, leftColumnShow} = storeToRefs(useReminderStore())

// ================================== 展示类数据 ===================================

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
