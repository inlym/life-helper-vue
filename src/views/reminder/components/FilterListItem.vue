<template>
  <!-- 过滤器列表项 -->
  <div
    :class="{'bg-gray-200': isActived}"
    class="flex h-10 cursor-pointer items-center justify-between rounded-md px-2 hover:bg-gray-200"
    @click="onItemClick(props.filter)"
  >
    <!-- 过滤器图标 -->
    <div class="flex size-10 items-center justify-center">
      <FilterIcon :filter="props.filter" />
    </div>
    <!-- 过滤器名称 -->
    <div class="text-md flex-1">{{ name }}</div>
    <div class="flex size-8 items-center justify-center">
      <div v-if="data" class="text-base">{{ numStr }}</div>
      <!-- 仅首次空数据等待中转圈即可 -->
      <a-spin v-else-if="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {countUncompletedTasks, ReminderFilterType} from '@/api/reminder'
import FilterIcon from './FilterIcon.vue'
import {useHttp} from '@/hooks/useHttp'
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import {getFilterName, reminderEmitter, useReminderStore} from '../reminder'
import {storeToRefs} from 'pinia'

interface FilterListItemProps {
  filter: ReminderFilterType
}

const props = defineProps<FilterListItemProps>()

const router = useRouter()
const reminderStore = useReminderStore()
const {rawProjectId} = storeToRefs(reminderStore)

// ===================================== 注册HTTP请求 =====================================

// 查看指定过滤器的未完成任务数
const {refresh, data, loading} = useHttp(countUncompletedTasks, {
  manual: false,
  defaultParams: [props.filter],
  cacheKey: `cache:reminder:filter-${props.filter}`,
})

// ===================================== 页面展示数据 =====================================

/** 过滤器名称 */
const name = computed(() => getFilterName(props.filter))

/** 未完成任务数 */
const numStr = computed(() => (data.value && data.value.num > 0 ? String(data.value.num) : ''))

/** 当前列表项是否为“选中”状态 */
const isActived = computed(() => `filter-${props.filter}` === rawProjectId.value)

// ===================================== 页面交互事件 =====================================

/** 点击列表项 */
function onItemClick(filter: ReminderFilterType) {
  router.push({name: 'reminder', params: {projectId: `filter-${filter}`}})
}

// ===================================== 事件监听 =====================================

reminderEmitter.on('taskChanged', () => {
  refresh()
})
</script>

<style scoped lang="scss"></style>
