<template>
  <!-- 过滤器列表区域 -->
  <div v-if="data">
    <!-- 单个列表项 -->
    <div
      class="flex h-10 cursor-pointer items-center justify-between rounded-md px-4 hover:bg-slate-200"
      :class="activeCategoryType === CategoryType.FILTER && item.type === activeFilterType ? 'bg-slate-100' : ''"
      v-for="item in filters"
      :key="item.type"
      @click="onItemClick(item)"
    >
      <hamburger-button theme="outline" size="18" />
      <div class="ml-2 text-base">{{ item.name }}</div>
      <div class="flex-1"></div>
      <div>{{ item.numStr }}</div>
    </div>
  </div>

  <!-- 首次加载中 -->
  <div v-else>
    <a-skeleton-button class="my-2" v-for="n in 6" active block />
  </div>
</template>

<script setup lang="ts">
import {getFilterList, type ReminderFilter} from '@/api/reminder'
import type {CommonListResponse} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {CategoryType, useReminderStore} from '@/stores/reminder'
import {HamburgerButton} from '@icon-park/vue-next'
import {storeToRefs} from 'pinia'
import {computed, watch} from 'vue'

interface ExtendedReminderFilter extends ReminderFilter {
  /** 文本化展示，为0则展示为空 */
  numStr: string
}

const reminderStore = useReminderStore()
const {activeCategoryType, activeFilterType, activeFilter, updateCount} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 获取各个过滤器的任务数
const {data, run, loading} = useHttp(getFilterList, {manual: false, onSuccess: onHttp1Success})

// ===================================== 页面元素状态 =====================================

/** 过滤器列表 */
const filters = computed<ExtendedReminderFilter[]>(() =>
  data && data.value
    ? data.value.list.map((item) => {
        return {...item, numStr: item.num > 0 ? String(item.num) : ''}
      })
    : [],
)

/** 点击列表项 */
function onItemClick(filter: ReminderFilter) {
  activeCategoryType.value = CategoryType.FILTER
  activeFilter.value = filter
  activeFilterType.value = filter.type
}

// ===================================== 请求回调处理 =====================================

function onHttp1Success(res: CommonListResponse<ReminderFilter>) {
  if (activeCategoryType.value === CategoryType.FILTER && !activeFilter.value) {
    activeFilter.value = res.list[0]
    activeFilterType.value = res.list[0].type
  }
}

// ===================================== 其他 =====================================

watch(updateCount, () => {
  run()
})
</script>

<style scoped lang="scss"></style>
