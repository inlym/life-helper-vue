<template>
  <HomeHeader></HomeHeader>
  <div class="main"></div>
</template>

<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader.vue'
</script>

<style scoped lang="scss">
.main {
  border: 1px solid blue;
  width: 100%;
  height: 500px;
}
</style>
