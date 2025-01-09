<template>
  <!-- 待办项目列表 -->
  <div class="py-1">
    <!-- 列表头部区域 -->
    <div class="flex h-8 items-center justify-between">
      <div class="font-bold text-gray-500">清单</div>
      <div class="mr-2 flex h-full w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200" @click="addProjectDialogOpen = true">
        <PlusOutlined />
      </div>
    </div>
    <!-- 列表内容区域 -->
    <div class="py-1">
      <template v-if="data">
        <!-- 情况[1]: 已获取数据 + 列表不为空 -->
        <div v-if="projects.length > 0">
          <!-- 列表项 -->
          <div
            class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-gray-200"
            :class="{'bg-gray-200': item.id.toString() === activeProjectId}"
            v-for="item in projects"
            :key="item.id"
            @click="onItemClick(item)"
          >
            <Icon icon="solar:clipboard-list-outline" :height="20" />
            <a-typography-text class="ml-2 mr-4 flex-1 text-sm" v-model:content="item.name" ellipsis />
            <div>{{ item.uncompletedTaskCount }}</div>
          </div>
        </div>
        <!-- 情况[2]: 已获取数据 + 列表为空 -->
        <div v-else>
          <a-empty :image="emptyImage" />
        </div>
      </template>
      <!-- 情况[3]: 未获取数据 -->
      <div v-else></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getProjectList, type ReminderProject} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {PlusOutlined} from '@ant-design/icons-vue'
import {Icon} from '@iconify/vue'
import {Empty} from 'ant-design-vue'
import {computed, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {reminderEmitter, useReminderStore} from '../reminder'
import {storeToRefs} from 'pinia'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const taskId = computed(() => route.params.taskId as string)

// ===================================== 全局状态管理 =====================================

const {addProjectDialogOpen} = storeToRefs(useReminderStore())

// ===================================== 注册HTTP请求 =====================================

// 获取待办项目列表
const {refresh, data, loading} = useHttp(getProjectList, {manual: false})

// ===================================== 页面展示数据 =====================================

/** 项目列表 */
const projects = computed(() => (data.value ? data.value.list : []))

const emptyImage = Empty.PRESENTED_IMAGE_SIMPLE

// ===================================== 页面元素状态 =====================================

/** 新增项目弹窗是否打开 */
const dialog1Open = ref(false)

/** 点击列表项 */
function onItemClick(project: ReminderProject) {
  router.push({name: 'reminder', params: {projectId: project.id}})
}

const activeProjectId = computed(() => {
  if (!projectId.value.startsWith('filter-')) {
    return projectId.value
  }

  return ''
})

// ===================================== 事件监听 =====================================

reminderEmitter.on('*', () => {
  refresh()
})
</script>

<style scoped lang="scss"></style>
