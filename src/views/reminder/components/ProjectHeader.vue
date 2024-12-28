<template>
  <!-- 项目导航区 -->
  <div class="project-header flex items-center justify-between">
    <!-- 过滤器或项目名称 -->
    <a-typography-title class="flex-1" :level="3" v-model:content="title" :ellipsis="true" />
    <!-- 右侧操作区 -->
    <div v-if="activeCategoryType === CategoryType.PROJECT" class="px-4">
      <a-button shape="circle" :icon="h(EditOutlined)" @click="onEditButtonClick" />
    </div>
  </div>

  <!-- 非页面布局流元素 -->
  <RenameProjectDialog v-if="activeCategoryType === CategoryType.PROJECT" v-model:open="open" />
</template>

<script setup lang="ts">
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {EditOutlined} from '@ant-design/icons-vue'
import {storeToRefs} from 'pinia'
import {computed, h, ref} from 'vue'
import RenameProjectDialog from './RenameProjectDialog.vue'
import {type ReminderProject} from '@/api/reminder'

const reminderStore = useReminderStore()
const {activeCategoryType, activeFilter, activeProject} = storeToRefs(reminderStore)

const open = ref<boolean>(false)
const project = ref<ReminderProject>()

// ===================================== 页面元素状态 =====================================

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

function onEditButtonClick() {
  project.value = activeProject.value!
  open.value = true
}
</script>

<style scoped lang="scss"></style>
