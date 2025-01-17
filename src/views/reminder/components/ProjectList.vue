<template>
  <!-- 待办项目列表 -->
  <div class="py-1">
    <!-- 列表头部区域 -->
    <div class="flex h-8 items-center justify-between">
      <div class="ml-2 font-bold text-gray-500">清单</div>
      <div class="mr-2 flex h-full w-8 cursor-pointer items-center justify-center rounded-md hover:bg-gray-200" @click="dialog1.open = true">
        <PlusOutlined />
      </div>
    </div>
    <!-- 列表内容区域 -->
    <div class="py-1">
      <template v-if="data">
        <!-- 情况[1]: 已获取数据 + 列表不为空 -->
        <div v-if="projects.length > 0">
          <!-- 列表项 -->
          <ProjectListItem v-for="project in projects" :key="project.id" :id="project.id" :name="project.name" :num="project.uncompletedTaskCount" />
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
import {getProjectList} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {PlusOutlined} from '@ant-design/icons-vue'
import {Empty} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {computed} from 'vue'
import {reminderEventBus, useReminderStore} from '../reminder'
import ProjectListItem from './ProjectListItem.vue'

// ================================== 跨组件数据 ===================================

const {dialog1, projectList} = storeToRefs(useReminderStore())

// ================================= 注册HTTP请求 =================================

// 获取待办项目列表
const {refresh, data, loading} = useHttp(getProjectList, {
  manual: false,
  onSuccess: (res) => {
    projectList.value = res.list
  },
})

// ================================== 展示类数据 ===================================

/** 项目列表 */
const projects = computed(() => (data.value ? data.value.list : []))

const emptyImage = Empty.PRESENTED_IMAGE_SIMPLE

// =================================== 事件监听 ===================================

reminderEventBus.on((event) => {
  if (event.refreshAll || event.refreshProjectList) {
    refresh()
  }
})
</script>

<style scoped lang="scss"></style>
