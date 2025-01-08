<template>
  <!-- 左侧项目列表（包含过滤器）区域 -->
  <div class="flex flex-col overflow-hidden p-2">
    <FilterList />
    <a-divider />
    <ProjectList />
  </div>
</template>

<script lang="ts" setup>
import FilterList from './FilterList.vue'
import ProjectList from './ProjectList.vue'
</script>

<style lang="scss" scoped></style>
