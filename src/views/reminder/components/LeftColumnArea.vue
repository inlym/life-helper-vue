<template>
  <!-- 左侧项目列表（包含过滤器）区域 -->
  <div class="flex flex-col overflow-hidden p-2">
    <FilterList />
    <a-divider />
    <ProjectList />
  </div>
</template>

<script setup lang="ts">
import {reminderEmitter} from '../reminder'
import CompletedBox from './TaskCompletedBox.vue'
import FilterList from './FilterList.vue'
import ProjectList from './ProjectList.vue'

// 2025-01-06 22:32:53
// 临时测试代码 --- start ---
reminderEmitter.on('hello', (str: any) => {
  console.log('===== LeftColumnArea =====')
  console.log(str)
})
// 临时测试代码  --- end ---
</script>

<style scoped lang="scss"></style>
