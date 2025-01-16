<template>
  <!-- 待办项目列表项 -->
  <a-dropdown :trigger="['contextmenu']">
    <div class="project-list-item" @click="onItemClick(props.id)" ref="project-list-item">
      <div :class="{'bg-gray-200': isActived}" class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-gray-200">
        <PhListLight class="size-5" />
        <a-typography-text class="ml-2 mr-4 flex-1 text-sm" v-model:content="props.name" ellipsis />
        <div class="flex items-center justify-between">
          <div>{{ numStr }}</div>
        </div>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <template #overlay>
      <a-menu>
        <a-menu-item key="1" @click="onRenameMenuClick">重命名</a-menu-item>
        <a-menu-item class="text-red-500" key="2">删除</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import {deleteProject} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {useElementHover} from '@vueuse/core'
import {storeToRefs} from 'pinia'
import {computed, useTemplateRef} from 'vue'
import {useRouter} from 'vue-router'
import PhListLight from '~icons/ph/list-light'
import {useReminderStore} from '../reminder'

const router = useRouter()

// ================================== 组件入参 ===================================

interface ProjectListItemProps {
  id: number
  name: string
  num: number
}

const props = defineProps<ProjectListItemProps>()

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {rawProjectId} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 删除项目
const {run, loading} = useHttp(deleteProject)

// =================================== 展示类数据 ==================================

/** 未完成任务数 */
const numStr = computed(() => (props.num > 0 ? String(props.num) : ''))

/** 当前列表项是否为“选中”状态 */
const isActived = computed(() => `${props.id}` === rawProjectId.value)

/** 当前组件是否被鼠标悬停 */
const isHovered = useElementHover(useTemplateRef('project-list-item'))

// =================================== 交互事件 ===================================

/** 点击列表项 */
function onItemClick(id: number) {
  // router.push({name: 'reminder', params: {projectId: `${id}`}})
  reminderStore.goToProject(id)
}

/** 点击“重命名”菜单按钮 */
function onRenameMenuClick() {
  reminderStore.openDialog2(props.id, props.name)
}

// ==================================== 其他 ====================================
</script>

<style scoped lang="scss"></style>
