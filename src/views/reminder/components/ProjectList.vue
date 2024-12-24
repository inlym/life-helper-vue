<template>
  <!-- 待办项目列表 -->
  <a-spin :spinning="loading" :delay="200">
    <div v-if="projectList.length > 0" class="p-1">
      <!-- 列表项 -->
      <div
        class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-slate-200"
        :class="activeCategoryType === CategoryType.Project && item.id === activeProjectId ? 'bg-slate-400' : ''"
        v-for="item in projectList"
        :key="item.id"
        @click="onItemClick(item.id)"
      >
        <hamburger-button theme="outline" size="18" />
        <div class="ml-2 text-base">{{ item.name }}</div>
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
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {HamburgerButton} from '@icon-park/vue-next'
import {storeToRefs} from 'pinia'

const reminderStore = useReminderStore()
const {activeCategoryType, activeProjectId, projectList} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 获取待办项目列表
const {run, loading} = useHttp(getProjectList, {manual: false, onSuccess: onHttpSuccess})

// ===================================== 页面元素状态 =====================================

/** 点击列表项 */
function onItemClick(projectId: number) {
  activeCategoryType.value = CategoryType.Project
  activeProjectId.value = projectId
}

// ===================================== 请求回调处理 =====================================

function onHttpSuccess(res: CommonListResponse<ReminderProject>) {
  projectList.value = res.list
}
</script>

<style scoped lang="scss"></style>
