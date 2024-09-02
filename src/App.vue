<template>
  <RouterView />

  <!-- 全局弹窗 -->
  <GlobalDialog />
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import GlobalDialog from './components/GlobalDialog.vue'
</script>
