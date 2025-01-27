<template>
  <!-- 中间任务列表区域 -->
  <div class="flex h-full flex-col p-5">
    <!-- 标题栏 -->
    <TaskListHeader />
    <!-- 添加任务输入框 -->
    <AddTaskInput />
    <!-- 列表主体 -->
    <div class="list-body flex-1 overflow-y-auto">
      <a-collapse v-model:activeKey="collapseActiveKey" ghost :bordered="false">
        <a-collapse-panel v-for="(group, index) in taskGroupList" :key="index.toString()">
          <template #header>
            <div class="flex items-center">
              <div class="text-md font-bold">{{ group.title }}</div>
              <div class="ml-4 text-sm text-gray-400">{{ group.list.length }}</div>
            </div>
          </template>
          <TaskListItem v-for="task in group.list" v-bind="task" />
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getTasksByFilter, getTasksByProjectId, FilterType, type Task} from '@/api/todolist'
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {reminderEventBus, useReminderStore} from '../reminder'
import {getTaskGroupListByDate, type TaskGroup} from '../services/filter'
import AddTaskInput from './AddTaskInput.vue'
import TaskListHeader from './TaskListHeader.vue'
import TaskListItem from './TaskListItem.vue'

const router = useRouter()

// ===================================== 跨组件数据 =====================================

const {rawProjectId, taskList} = storeToRefs(useReminderStore())

// ===================================== 注册HTTP请求 =====================================

// 以过滤器为条件，获取任务列表
const {data: data1, run: run1} = useHttp(getTasksByFilter, {onSuccess})

// 以项目 ID 为条件，获取任务列表
const {data: data2, run: run2} = useHttp(getTasksByProjectId, {onSuccess})

// ===================================== 展示类数据 =====================================

/** 任务分组列表 */
const taskGroupList = ref<TaskGroup[]>([])

// ===================================== 状态类数据 =====================================

/** 激活的折叠面板（目前处理为全部激活） */
const collapseActiveKey = ref<string[]>([])

// ===================================== 交互事件 =====================================

function refreshData() {
  if (rawProjectId.value.startsWith('filter-')) {
    const type = rawProjectId.value.substring(7).toUpperCase() as FilterType
    run1(type)
  } else {
    run2(Number.parseInt(rawProjectId.value))
  }
}

// ===================================== 请求回调 =====================================

function onSuccess(res: CommonListResponse<Task>) {
  taskList.value = res.list
  taskGroupList.value = getTaskGroupListByDate(res.list)
  collapseActiveKey.value = taskGroupList.value.map((item, index) => index.toString())
}

// ===================================== 事件监听 =====================================

watch(
  rawProjectId,
  (newProjectId) => {
    refreshData()
  },
  {immediate: true},
)

watch(
  taskList,
  (newList) => {
    taskGroupList.value = getTaskGroupListByDate(newList)
    collapseActiveKey.value = taskGroupList.value.map((item, index) => index.toString())
  },
  {deep: true},
)

reminderEventBus.on((event) => {
  if (event.refreshAll || event.refreshTaskList) {
    refreshData()
  }
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}

.list-body :deep(.ant-collapse-header) {
  padding: 8px 8px 0;
}

.list-body :deep(.ant-collapse-content-box) {
  padding: 2px 4px;
  padding-block: 2px 4px;
}
</style>
