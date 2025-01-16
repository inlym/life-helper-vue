<template>
  <!-- 外层占满屏幕高度的容器，内部分设左、中、右三栏 -->
  <div class="reminder-view flex h-screen justify-between">
    <!-- 左栏 -->
    <div class="w-80 bg-gray-50" v-show="leftColumnShow">
      <LeftColumnArea />
    </div>
    <!-- 中栏 -->
    <div class="flex-1">
      <TaskListArea />
    </div>
    <!-- 右栏 -->
    <div class="max-w-[800px] flex-1 border-l">
      <TaskDetail />
    </div>
  </div>

  <!-- 非页面布局流元素 -->
  <AddProjectDialog />
  <RenameProjectDialog />
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia'
import AddProjectDialog from './components/AddProjectDialog.vue'
import LeftColumnArea from './components/LeftColumnArea.vue'
import RenameProjectDialog from './components/RenameProjectDialog.vue'
import TaskDetail from './components/TaskDetail.vue'
import TaskListArea from './components/TaskListArea.vue'
import {useReminderStore} from './reminder'

// ================================== 跨组件数据 ===================================

const {leftColumnShow} = storeToRefs(useReminderStore())
</script>

<style scoped lang="scss"></style>
