<template>
  <!-- 左侧项目列表（包含过滤器）区域 -->
  <div class="flex flex-col overflow-hidden p-2">
    <FilterList />
    <a-divider />
    <ProjectList />
  </div>
</template>

<script setup lang="ts">
import FilterList from './FilterList.vue'
import ProjectList from './ProjectList.vue'
</script>

<style scoped lang="scss"></style>
