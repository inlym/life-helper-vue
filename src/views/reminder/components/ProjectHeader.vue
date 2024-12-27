<template>
  <!-- 项目导航区 -->
  <div class="project-header flex items-center justify-between">
    <a-typography-title class="flex-1" :level="3" v-model:content="title" :ellipsis="true" />
    <div class="w-10">111</div>
  </div>
</template>

<script setup lang="ts">
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {storeToRefs} from 'pinia'
import {computed} from 'vue'

const reminderStore = useReminderStore()
const {activeCategoryType, activeFilter, activeProject, activeTaskId} = storeToRefs(reminderStore)

const title = computed(() => {
  if (activeCategoryType.value === CategoryType.FILTER) {
    if (activeFilter.value) {
      return activeFilter.value.name
    }
  }

  if (activeCategoryType.value === CategoryType.PROJECT) {
    if (activeProject.value) {
      return activeProject.value.name
    }
  }

  return ' '
})
</script>

<style scoped lang="scss"></style>
