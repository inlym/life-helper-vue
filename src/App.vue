<template>
  <!-- 在 ConfigProvider 中配置主题 -->
  <a-config-provider :theme>
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {RouterView} from 'vue-router'

const theme = ref({
  token: {
    colorPrimary: '#10c378',
  },
})
</script>
