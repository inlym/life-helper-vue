<template>
  <!-- 占满屏幕宽度的横条 -->
  <a-flex class="h-16 w-full" justify="center" align="center">
    <!-- 中间内容区 -->
    <a-flex class="container" justify="space-between" align="center">
      <!-- logo -->
      <div class="mx-8 h-10 w-40 bg-slate-600"></div>
      <!-- 菜单组 -->
      <a-menu mode="horizontal" :items="menus" />
      <!-- 占满剩余宽度 -->
      <div class="grow"></div>
      <a-button type="primary" size="large" ghost>登录</a-button>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts">
import {MenuProps} from 'ant-design-vue'
import {ref} from 'vue'

/** 菜单列表 */
const menus = ref<MenuProps['items']>([
  {
    key: 'index',
    label: '首页',
    title: '首页',
  },
  {
    key: 'task',
    label: '任务',
    title: '任务',
  },
  {
    key: 'note',
    label: '笔记',
    title: '笔记',
  },
])
</script>

<style scoped lang="scss"></style>
