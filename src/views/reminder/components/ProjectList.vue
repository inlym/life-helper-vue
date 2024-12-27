<template>
  <!-- 待办项目列表 -->
  <a-spin :spinning="loading1" :delay="200">
    <div v-if="projectList.length > 0" class="p-1">
      <!-- 列表项 -->
      <div
        class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-slate-200"
        :class="activeCategoryType === CategoryType.PROJECT && item.id === activeProjectId ? 'bg-slate-100' : ''"
        v-for="item in projectList"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <hamburger-button theme="outline" size="18" />
        <a-typography-text class="ml-2 mr-4 text-base" v-model:content="item.name" ellipsis />
        <div class="flex-1"></div>
        <div>{{ item.uncompletedTaskCount }}</div>
      </div>
    </div>

    <!-- 空列表情况 -->
    <!-- [TODO] -->
    <div v-else></div>
  </a-spin>
</template>

<script setup lang="ts">
import {getProjectList, type ReminderProject} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {HamburgerButton} from '@icon-park/vue-next'
import {storeToRefs} from 'pinia'
import {computed, watch} from 'vue'

const reminderStore = useReminderStore()
const {activeCategoryType, activeProjectId, activeProject, updateCount} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 获取待办项目列表
const {run: run1, data: data1, loading: loading1} = useHttp(getProjectList, {manual: false})

// ===================================== 页面元素状态 =====================================

const projectList = computed(() => (data1 && data1.value ? data1.value.list : []))

/** 点击列表项 */
function onItemClick(project: ReminderProject) {
  activeCategoryType.value = CategoryType.PROJECT
  activeProject.value = project
  activeProjectId.value = project.id
}

watch(updateCount, () => {
  run1()
})
</script>

<style scoped lang="scss"></style>
