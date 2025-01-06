<template>
  <!-- 待办项目列表 -->
  <div class="py-1">
    <!-- 列表头部区域 -->
    <div class="flex h-8 items-center justify-between">
      <div class="font-bold text-gray-500">清单</div>
      <div class="mr-2 flex h-full w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200">
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
            <FolderOpenOutlined />
            <a-typography-text class="ml-2 mr-4 text-sm" v-model:content="item.name" ellipsis />
            <div class="flex-1"></div>
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

  <!-- 非页面布局流元素 -->
  <AddProjectDialog v-model:open="dialog1Open" />
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import AddProjectDialog from './AddProjectDialog.vue'
import {FolderOpenOutlined, PlusOutlined} from '@ant-design/icons-vue'
import {useHttp} from '@/hooks/useHttp'
import {getProjectList, type ReminderProject} from '@/api/reminder'
import {Empty} from 'ant-design-vue'
import {useRoute, useRouter} from 'vue-router'
import {reminderEmitter} from '../reminder'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const taskId = computed(() => route.params.taskId as string)

// ===================================== 注册HTTP请求 =====================================

// 获取待办项目列表
const {run, data, loading} = useHttp(getProjectList, {manual: false})

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

// 2025-01-06 22:35:05
// 临时测试代码 --- start ---
reminderEmitter.on('hello', (str: any) => {
  console.log('===== ProjectList =====')
  console.log(str)
})
// 临时测试代码  --- end ---
</script>

<style scoped lang="scss"></style>
