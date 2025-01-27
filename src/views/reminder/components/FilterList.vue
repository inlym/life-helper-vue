<template>
  <!-- 左栏右上角的过滤器列表 -->
  <div class="py-2">
    <FilterListItem v-for="item in filterList" :key="item.type" :filter="item.type" />
  </div>
</template>

<script lang="ts" setup>
import {FilterType} from '@/api/todolist'
import {reactive} from 'vue'
import FilterListItem from './FilterListItem.vue'

interface Filter {
  type: FilterType
}

const filterList = reactive<Filter[]>([
  {type: FilterType.ALL},
  {type: FilterType.TODAY},
  {type: FilterType.NEXT_SEVEN_DAYS},
  {type: FilterType.NO_DATE},
  {type: FilterType.INBOX},
])
</script>

<style lang="scss" scoped></style>
