<template>
  <div class="flex h-screen flex-col">
    <div class="border-b border-gray-200">
      <AppHeader />
    </div>
    <div class="flex flex-1 items-center justify-center">
      <div class="flex flex-col items-center">
        <img :src="imgUrl" class="size-120" />
        <div class="text-xl font-bold">网站维护中，暂停使用</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/header/AppHeader.vue'

const imgUrl = 'https://static.weutil.com/web/LRYkzg1hdkuq.svg'
</script>

<style scoped lang="scss"></style>
