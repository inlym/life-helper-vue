<template>
  <!-- 中间任务列表区域 -->
  <div class="h-full p-5">
    <!-- 标题栏 -->
    <div class="flex h-10 items-center justify-between">
      <a-typography-text class="flex-1 text-2xl font-bold">所有待办</a-typography-text>
    </div>
    <!-- 列表主体 -->
    <div class="list-body overflow-y-auto">
      <TaskListItem v-for="item in taskList" v-bind="item" @click="onItemClick(item)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {getTasksByFilter, getTasksByProjectId, ReminderFilterType, type ReminderTask} from '@/api/reminder'
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {computed, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import TaskListItem from './TaskListItem.vue'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const taskId = computed(() => route.params.taskId as string)

// ===================================== 注册页面请求 =====================================

// 以过滤器为条件，获取任务列表
const {data: data1, run: run1} = useHttp(getTasksByFilter, {onSuccess})

// 以项目 ID 为条件，获取任务列表
const {data: data2, run: run2} = useHttp(getTasksByProjectId, {onSuccess})

// ===================================== 页面展示数据 =====================================

/** 任务列表 */
const taskList = ref<ReminderTask[]>()

watch(
  projectId,
  (newProjectId) => {
    if (newProjectId.startsWith('filter-')) {
      const type = projectId.value.substring(7).toUpperCase() as ReminderFilterType
      run1(type)
    } else {
      run2(Number.parseInt(newProjectId))
    }
  },
  {immediate: true},
)

function onSuccess(res: CommonListResponse<ReminderTask>) {
  taskList.value = res.list
}

function onItemClick(item: ReminderTask) {
  router.push({name: 'reminder', params: {projectId: projectId.value, taskId: item.id}})
}
</script>

<style scoped lang="scss"></style>
