<template>
  <!-- 在 ConfigProvider 中配置主题 -->
  <a-config-provider :theme>
    <!-- App 包裹组件，用于提供消费上下文 -->
    <a-app>
      <RouterView />
    </a-app>
  </a-config-provider>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {RouterView} from 'vue-router'

const theme = ref({
  token: {
    // 使用“青葱色”作为品牌色
    colorPrimary: '#0eb83a',
  },
})
</script>
