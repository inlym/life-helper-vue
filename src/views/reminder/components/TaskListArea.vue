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
          <TaskListItem v-for="task in group.list" v-bind="task" @click="onItemClick(task)" />
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getTasksByFilter, getTasksByProjectId, ReminderFilterType, type ReminderTask} from '@/api/reminder'
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {storeToRefs} from 'pinia'
import {ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useReminderStore} from '../reminder'
import {getTaskGroupListByDate, type TaskGroup} from '../services/filter'
import AddTaskInput from './AddTaskInput.vue'
import TaskListHeader from './TaskListHeader.vue'
import TaskListItem from './TaskListItem.vue'

const router = useRouter()

// ===================================== 共享类数据 =====================================

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

function onItemClick(item: ReminderTask) {
  router.push({name: 'reminder', params: {projectId: rawProjectId.value, taskId: item.id}})
}

// ===================================== 请求回调 =====================================

function onSuccess(res: CommonListResponse<ReminderTask>) {
  taskList.value = res.list
  taskGroupList.value = getTaskGroupListByDate(res.list)
  collapseActiveKey.value = taskGroupList.value.map((item, index) => index.toString())
}

// ===================================== 事件监听 =====================================

watch(
  rawProjectId,
  (newProjectId) => {
    if (newProjectId.startsWith('filter-')) {
      const type = newProjectId.substring(7).toUpperCase() as ReminderFilterType
      run1(type)
    } else {
      run2(Number.parseInt(newProjectId))
    }
  },
  {immediate: true},
)
</script>

<style lang="scss" scoped>
.list-body::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  /**/
}

.list-body::-webkit-scrollbar-track {
  background: rgb(239, 239, 239);
  border-radius: 2px;
}

.list-body::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 6px;
}

.list-body::-webkit-scrollbar-thumb:hover {
  background: #b2b2b2;
}
</style>
