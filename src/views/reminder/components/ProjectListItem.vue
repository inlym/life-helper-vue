<template>
  <!-- 待办项目列表项 -->
  <a-dropdown :trigger="['contextmenu']">
    <div class="project-list-item" @click="onItemClick(props.id)" ref="project-list-item">
      <div :class="{'bg-gray-200': isActived}" class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-gray-200">
        <PhListLight class="size-5" />
        <div class="mr-4 ml-2 flex-1 truncate text-sm">{{ props.name }}</div>
        <div class="flex items-center justify-between">
          <div>{{ numStr }}</div>
        </div>
      </div>
    </div>

    <!-- 下拉菜单 -->
    <template #overlay>
      <a-menu class="w-40">
        <a-menu-item key="1" @click="onRenameMenuClick">
          <div class="flex h-8 items-center gap-2">
            <MaterialSymbolsLightEditSquareOutlineRounded class="size-5" />
            <div>重命名</div>
          </div>
        </a-menu-item>
        <a-menu-item key="2" @click="onDeleteMenuClick">
          <div class="flex h-8 items-center gap-2 hover:text-red-500">
            <MaterialSymbolsLightDeleteOutlineRounded class="size-5" />
            <div>删除</div>
          </div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script setup lang="ts">
import {deleteProject} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {useElementHover} from '@vueuse/core'
import {storeToRefs} from 'pinia'
import {computed, useTemplateRef} from 'vue'
import MaterialSymbolsLightDeleteOutlineRounded from '~icons/material-symbols-light/delete-outline-rounded'
import MaterialSymbolsLightEditSquareOutlineRounded from '~icons/material-symbols-light/edit-square-outline-rounded'
import PhListLight from '~icons/ph/list-light'
import {reminderEventBus, useReminderStore} from '../reminder'
import {Modal} from 'ant-design-vue'

// =================================== 组件入参 ===================================

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
const {run: run1, loading: loading1} = useHttp(deleteProject, {onSuccess: onSuccess1})

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
  reminderStore.goToProject(id)
}

/** 点击[重命名]菜单按钮 */
function onRenameMenuClick() {
  reminderStore.openDialog2(props.id, props.name)
}

/** 点击[删除]菜单按钮 */
function onDeleteMenuClick() {
  if (props.num > 0) {
    Modal.info({
      title: '提示',
      content: '请先将清单内的未完成任务移动至其他清单，再删除清单',
      okText: '我知道了',
      maskClosable: true,
    })
  } else {
    Modal.confirm({
      title: '提示',
      content: '确定删除该清单吗？清单中的所有任务均会被删除',
      okText: '删除',
      cancelText: '取消',
      maskClosable: true,
      okButtonProps: {loading: loading1.value},
      onOk: () => {
        run1(props.id)
      },
    })
  }
}

// =================================== 请求回调 ===================================

/** 删除项目操作请求成功 */
function onSuccess1() {
  reminderEventBus.emit({refreshProjectList: true})
}
</script>

<style scoped lang="scss"></style>
