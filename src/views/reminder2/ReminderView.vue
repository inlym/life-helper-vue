<template>
  <!-- 外层占满屏幕高度的容器，内部分设左、中、右三栏 -->
  <div class="flex h-screen justify-between">
    <!-- 左栏，项目及筛选项区域 -->
    <div class="flex w-80 flex-col bg-gray-50 p-2">
      <!-- 顶部筛选过滤器区域 -->
      <div class="h-80">
        <TaskFilter />
      </div>
      <!-- 我的项目区域 -->
      <div class="mt-6 flex-1">
        <!-- 标题栏区域 -->
        <div class="flex items-center justify-between">
          <all-application theme="outline" size="20" />
          <div class="ml-2 h-10 text-base font-bold leading-10">我的项目</div>
          <div class="flex-1"></div>
          <PlusOutlined class="w-6" @click="addProjectDialogOpened = true" />
        </div>
        <!-- 列表区域 -->
        <div class="mt-1">
          <ProjectList />
        </div>
      </div>
    </div>
    <!-- 中栏，任务列表区域 -->
    <div class="flex w-full min-w-96 flex-1 flex-col p-4">
      <ProjectHeader />
      <AddTaskInput />
      <TaskList class="flex-1" />
    </div>
    <!-- 右栏，任务详情，按需展示 -->
    <div v-if="activeTaskId" class="w-[800px] border-l">
      <TaskDetail />
    </div>
  </div>

  <!-- 非页面布局流元素 -->
  <AddProjectDialog v-model:open="addProjectDialogOpened" />
</template>

<script setup lang="ts">
import {useReminderStore} from '@/stores/reminder'
import TaskDetail from '@/views/reminder/components/TaskDetail.vue'
import {PlusOutlined} from '@ant-design/icons-vue'
import {AllApplication} from '@icon-park/vue-next'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import AddProjectDialog from './components/AddProjectDialog.vue'
import AddTaskInput from './components/AddTaskInput.vue'
import TaskFilter from './components/FilterList.vue'
import ProjectHeader from './components/ProjectHeader.vue'
import ProjectList from './components/ProjectList.vue'
import TaskList from './components/TaskList.vue'

const reminderStore = useReminderStore()
const {activeTaskId} = storeToRefs(reminderStore)

/** 新增项目弹窗是否打开 */
const addProjectDialogOpened = ref(false)
</script>

<style scoped lang="scss"></style>
