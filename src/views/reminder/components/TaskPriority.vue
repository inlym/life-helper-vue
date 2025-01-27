<template>
  <!-- 任务优先级设置入口 -->
  <div class="task-priority">
    <a-dropdown :trigger="['click']">
      <!-- 入口区域 -->
      <div class="flex size-8 cursor-pointer items-center justify-center rounded hover:bg-gray-200">
        <TaskPriorityIcon :priority="props.priority" />
      </div>

      <!-- 下拉菜单 -->
      <template #overlay>
        <a-menu class="w-40">
          <a-menu-item :key="item.key" v-for="item in menuItemList" @click="onItemClick(item.type)">
            <div class="flex h-6 items-center gap-2" :class="{'text-blue-500': props.priority === item.type}">
              <TaskPriorityIcon :priority="item.type" />
              <div class="flex-1 text-sm">{{ item.text }}</div>
              <MaterialSymbolsCheckRounded v-if="props.priority === item.type" />
            </div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import {Priority, setPriority, type Task} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {ref} from 'vue'
import {useReminderStore} from '../reminder'
import TaskPriorityIcon from './TaskPriorityIcon.vue'
import MaterialSymbolsCheckRounded from '~icons/material-symbols/check-rounded'

// =================================== 组件入参 ===================================

interface TaskPriorityProps {
  /** 任务 ID */
  taskId: number
  /** 任务优先级 */
  priority: Priority
}

const props = defineProps<TaskPriorityProps>()

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()

// ================================= 注册HTTP请求 =================================

// 请求[1]: 设置任务优先级
const {run: run1} = useHttp(setPriority, {onSuccess: onSuccess1})

// ================================== 展示类数据 ===================================

/** 弹出的按钮菜单列表 */
const menuItemList = ref([
  {key: 3, type: Priority.HIGH, text: '高优先级'},
  {key: 2, type: Priority.MEDIUM, text: '中优先级'},
  {key: 1, type: Priority.LOW, text: '低优先级'},
  {key: 0, type: Priority.NONE, text: '无优先级'},
])

// =================================== 元素状态 ===================================

// =================================== 交互事件 ===================================

/** 点击菜单项 */
function onItemClick(type: Priority) {
  run1(props.taskId, type)
}

// =================================== 请求回调 ===================================

function onSuccess1(res: Task) {
  reminderStore.syncTask(res)
}

// =================================== 事件监听 ===================================
</script>

<style scoped lang="scss"></style>
