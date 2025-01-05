<template>
  <!-- 左栏右上角的过滤器列表 -->
  <div class="py-2">
    <div
      @click="onItemClick(item.type)"
      v-for="item in filters"
      :key="item.type"
      class="flex h-10 cursor-pointer items-center justify-between rounded-md px-3 hover:bg-gray-200"
    >
      <Label class="mr-2" theme="outline" size="18" fill="#333" />
      <div class="flex-1 text-sm">{{ item.name }}</div>
      <div>{{ item.num > 0 ? String(item.num) : '' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getFilterList, ReminderFilterType} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {Label} from '@icon-park/vue-next'
import {computed} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

// ===================================== 注册页面请求 =====================================

// 获取各个过滤器的任务数
const {data, run, loading} = useHttp(getFilterList, {manual: false})

// ===================================== 页面展示数据 =====================================

/** 过滤器列表 */
const filters = computed(() => (data.value && data.value.list ? data.value.list : []))

// ===================================== 页面元素状态 =====================================
function onItemClick(type: ReminderFilterType) {
  router.push({name: 'reminder', params: {projectId: `filter-${type.toLowerCase()}`}})
}
</script>

<style scoped lang="scss"></style>
