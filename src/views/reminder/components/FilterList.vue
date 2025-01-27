<template>
  <!-- 左栏右上角的过滤器列表 -->
  <div class="py-2">
    <FilterListItem v-for="item in filterList" :key="item.type" :filter="item.type" />
  </div>
</template>

<script lang="ts" setup>
import {ReminderFilterType} from '@/api/todolist'
import {reactive} from 'vue'
import FilterListItem from './FilterListItem.vue'

interface Filter {
  type: ReminderFilterType
}

const filterList = reactive<Filter[]>([
  {type: ReminderFilterType.ALL},
  {type: ReminderFilterType.TODAY},
  {type: ReminderFilterType.NEXT_SEVEN_DAYS},
  {type: ReminderFilterType.NO_DATE},
  {type: ReminderFilterType.INBOX},
])
</script>

<style lang="scss" scoped></style>
