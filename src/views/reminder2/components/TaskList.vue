<template>
  <!-- 任务列表区域 -->
  <div class="mt-2 h-full overflow-y-auto">
    <div class="flex h-10 items-center hover:bg-gray-200" v-for="item in taskList" @click="onTaskItemClick(item.id)" :key="item.id">
      <a-checkbox v-model:checked="item.computed" />
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getTasksByFilter, getTasksByProjectId, ReminderFilterType, type ReminderTask} from '@/api/reminder'
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'

const reminderStore = useReminderStore()
const {activeCategoryType, activeFilterType, activeProjectId, activeTaskId} = storeToRefs(reminderStore)

interface ExtendedReminderTask extends ReminderTask {
  /** 是否已完成 */
  computed: boolean
}

// ===================================== 注册页面请求 =====================================

// 以过滤器为条件，获取任务列表
const {data: data1, run: run1} = useHttp(getTasksByFilter, {onSuccess: onHttpSuccess})

// 以项目 ID 为条件，获取任务列表
const {data: data2, run: run2} = useHttp(getTasksByProjectId, {onSuccess: onHttpSuccess})

// ===================================== 页面展示数据 =====================================

/** 任务列表 */
const taskList = ref<ExtendedReminderTask[]>()

// ===================================== 页面事件处理 =====================================

/** 点击任务列表项 */
function onTaskItemClick(taskId: number) {
  activeTaskId.value = taskId
}

// ===================================== 请求回调处理 =====================================

function onHttpSuccess(res: CommonListResponse<ReminderTask>) {
  taskList.value = res.list.map((item) => {
    return {...item, computed: item.completeTime ? true : false}
  })
}

// ===================================== 其他 =====================================

watch([activeCategoryType, activeFilterType, activeProjectId], ([type, filterType, projectId]) => {
  if (type === CategoryType.FILTER && filterType) {
    run1(filterType)
  } else if (type === CategoryType.PROJECT && projectId) {
    run2(projectId)
  }
})
</script>

<style scoped lang="scss"></style>
