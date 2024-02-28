<template>
  <a-config-provider :theme="myTheme">
    <RouterView />
  </a-config-provider>
</template>

<script setup lang="ts">
import {RouterView} from 'vue-router'
import {ref} from 'vue'

/** 自定义主题配置 */
const myTheme = ref({token: {colorPrimary: '#00b669'}})
</script>
