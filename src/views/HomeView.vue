<template>
  <HomeHeader></HomeHeader>
  <div class="main">
    <div class="one"><router-link to="/about">Go to about</router-link></div>
    <div class="one"><router-link to="/login">Go to login</router-link></div>
    <div class="one"><router-link to="/dashboard">Go to dashboard</router-link></div>
  </div>
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
