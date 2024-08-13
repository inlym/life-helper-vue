<template>
  <!-- 在 ConfigProvider 中定制主题 -->
  <a-config-provider :theme>
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const theme = ref({
  token: {
    colorPrimary: '#00b669'
  }
})
</script>
