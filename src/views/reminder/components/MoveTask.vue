<template>
  <!-- 任务详情区域 - 移动任务操作 -->
  <div class="move-task">
    <a-popover title="将任务移动至" trigger="click" v-model:open="popoverOpen">
      <template #content>
        <div class="flex w-52 flex-col">
          <!-- 列表项 -->
          <div
            v-for="item in mergedProjectList"
            :key="item.id"
            :class="{'text-blue-500': item.id === props.projectId}"
            class="flex h-10 cursor-pointer items-center justify-between gap-1 rounded-md px-2 hover:bg-gray-100"
            @click="onItemClick(item.id)"
          >
            <!-- 图标区域 -->
            <div class="flex items-center justify-between">
              <HeroiconsInbox v-if="item.id === 0" class="size-5" />
              <PhListLight v-else class="size-5" />
            </div>
            <div class="flex-1 truncate text-sm">{{ item.name }}</div>
            <MaterialSymbolsLightCheckRounded v-if="item.id === props.projectId" class="size-5" />
          </div>
        </div>
      </template>

      <div class="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 hover:bg-gray-100">
        <MaterialSymbolsLightDriveFileMoveOutline class="size-6" />
        <div class="max-w-40 truncate text-sm">{{ name }}</div>
      </div>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import {moveTask, type ReminderTask} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'
import MaterialSymbolsLightDriveFileMoveOutline from '~icons/material-symbols-light/drive-file-move-outline'
import PhListLight from '~icons/ph/list-light'
import {reminderEventBus, useReminderStore} from '../reminder'
import HeroiconsInbox from '~icons/heroicons/inbox'
import MaterialSymbolsLightCheckRounded from '~icons/material-symbols-light/check-rounded'

// =================================== 组件入参 ===================================

interface MoveTaskProps {
  /** 任务 ID */
  taskId: number
  /** 项目 ID */
  projectId: number
}

const props = defineProps<MoveTaskProps>()

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {projectList} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 移动任务
const {run} = useHttp(moveTask, {onSuccess})

// ================================== 展示类数据 ===================================

/** 用于展示的项目名称 */
const name = computed(() => {
  const project = projectList.value.find((project) => project.id === props.projectId)
  if (project) {
    return project.name
  }
  return '收集箱'
})

const mergedProjectList = computed(() => [
  {
    id: 0,
    name: '收集箱',
  },
  ...projectList.value,
])

// =================================== 元素状态 ===================================

/** 气泡卡片是否显示 */
const popoverOpen = ref(false)

// =================================== 交互事件 ===================================

/** 点击列表项 */
function onItemClick(projectId: number) {
  if (projectId !== props.projectId) {
    run(props.taskId, projectId)
  }
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: ReminderTask) {
  popoverOpen.value = false
  reminderEventBus.emit({refreshProjectList: true, refreshTaskList: true})
  reminderStore.syncTask(res)
}
</script>

<style scoped lang="scss"></style>
