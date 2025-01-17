<template>
  <!-- 左侧项目列表（包含过滤器）区域 -->
  <div class="flex h-full flex-col overflow-auto p-2">
    <FilterList />
    <a-divider />
    <ProjectList />
  </div>
</template>

<script lang="ts" setup>
import FilterList from './FilterList.vue'
import ProjectList from './ProjectList.vue'
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #f9fafb;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb {
  background: #9ca3af;
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
