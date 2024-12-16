<template>
  <!-- 在 ConfigProvider 中配置主题 -->
  <a-config-provider :theme="themeConfig" :locale="zhCN">
    <!-- App 包裹组件，用于提供消费上下文 -->
    <a-app class="h-full w-full">
      <RouterView />
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import {storeToRefs} from 'pinia'
import {RouterView} from 'vue-router'
import {useAppStore} from './stores/app'

const appStore = useAppStore()
const {themeConfig} = storeToRefs(appStore)
</script>
