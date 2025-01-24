<template>
  <!-- 顶部导航栏 -->
  <a-affix :offset-top="0">
    <div class="flex justify-center border-b border-gray-300 bg-white">
      <div class="w-300">
        <AppHeader />
      </div>
    </div>
  </a-affix>

  <!-- AI 介绍部分 -->
  <HomeAiPart />
  <HomeOrganizationPart />

  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from '@/components/footer/AppFooter.vue'
import AppHeader from '@/components/header/AppHeader.vue'
import HomeAiPart from './components/HomeAiPart.vue'
import HomeOrganizationPart from './components/HomeOrganizationPart.vue'

// =================================== 组件入参 ===================================

// ================================== 跨组件数据 ===================================

// ================================= 注册HTTP请求 =================================

// ================================== 表单类数据 ===================================

// ================================== 展示类数据 ===================================

// =================================== 元素状态 ===================================

// =================================== 交互事件 ===================================

// =================================== 请求回调 ===================================

// =================================== 事件监听 ===================================
</script>

<style scoped lang="scss"></style>
