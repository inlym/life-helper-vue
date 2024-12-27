<template>
  <!-- 过滤器区域 -->
  <div
    class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-slate-400"
    :class="activeCategoryType === CategoryType.FILTER && item.id === activeFilter ? 'bg-slate-200' : ''"
    v-for="item in filters"
    :key="item.id"
    @click="onItemClick(item.id)"
  >
    <hamburger-button theme="outline" size="18" />
    <div class="ml-2 text-base">{{ item.name }}</div>
    <div class="flex-1"></div>
    <div>{{ item.count }}</div>
  </div>
</template>

<script setup lang="ts">
import {TaskFilter} from '@/api/reminder'
import {HamburgerButton} from '@icon-park/vue-next'
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'

const reminderStore = useReminderStore()
const {activeCategoryType, activeFilter, projectList} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 获取各个过滤器的任务数
// TODO

// ===================================== 页面元素状态 =====================================

const filters = ref([
  {name: '所有', id: TaskFilter.ALL_UNCOMPLETED, count: 0},
  {name: '今天', id: TaskFilter.TODAY, count: 0},
  {name: '已过期', id: TaskFilter.EXPIRED, count: 0},
  {name: '无期限', id: TaskFilter.UNDATED, count: 0},
])

/** 点击列表项 */
function onItemClick(filterId: TaskFilter) {
  activeCategoryType.value = CategoryType.FILTER
  activeFilter.value = filterId
}
</script>

<style scoped lang="scss"></style>
