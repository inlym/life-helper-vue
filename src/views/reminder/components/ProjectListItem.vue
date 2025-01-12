<template>
  <!-- 待办项目列表项 -->
  <div class="project-list-item" @click="onItemClick(props.id)">
    <a-dropdown :trigger="['contextmenu']">
      <div :class="{'bg-gray-200': isActived}" class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-gray-200">
        <SolarClipboardListOutline :height="20" />
        <a-typography-text class="ml-2 mr-4 flex-1 text-sm" v-model:content="props.name" ellipsis />
        <div>{{ numStr }}</div>
      </div>

      <!-- 右键弹出菜单 -->
      <template #overlay>
        <a-menu>
          <a-menu-item key="1">重命名</a-menu-item>
          <a-menu-item key="2">删除</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script setup lang="ts">
import SolarClipboardListOutline from '~icons/solar/clipboard-list-outline'
import {storeToRefs} from 'pinia'
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {useReminderStore} from '../reminder'

interface ProjectListItemProps {
  id: number
  name: string
  num: number
}

const props = defineProps<ProjectListItemProps>()

const router = useRouter()
const reminderStore = useReminderStore()
const {rawProjectId} = storeToRefs(reminderStore)

// ===================================== 页面展示数据 =====================================

/** 未完成任务数 */
const numStr = computed(() => (props.num > 0 ? String(props.num) : ''))

/** 当前列表项是否为“选中”状态 */
const isActived = computed(() => `${props.id}` === rawProjectId.value)

// ===================================== 页面交互事件 =====================================

/** 点击列表项 */
function onItemClick(id: number) {
  router.push({name: 'reminder', params: {projectId: `${id}`}})
}
</script>

<style scoped lang="scss"></style>
