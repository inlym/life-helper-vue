<template>
  <!-- 左栏右上角的过滤器列表 -->
  <div class="py-2">
    <FilterListItem v-for="item in filterList" :key="item.type" :filter="item.type" :name="item.name" />
  </div>
</template>

<script lang="ts" setup>
import {ReminderFilterType} from '@/api/reminder'
import {reactive} from 'vue'
import FilterListItem from './FilterListItem.vue'

interface Filter {
  type: ReminderFilterType
  name: string
}

const filterList = reactive<Filter[]>([
  {type: ReminderFilterType.ALL, name: '所有'},
  {type: ReminderFilterType.TODAY, name: '今天'},
  {type: ReminderFilterType.NEXT_SEVEN_DAYS, name: '最近7天'},
  {type: ReminderFilterType.INBOX, name: '收集箱'},
])
</script>

<style lang="scss" scoped></style>
