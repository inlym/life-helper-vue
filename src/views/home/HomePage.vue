<template>
  <AnnouncementBar />

  <!-- 顶部导航栏 -->
  <a-affix :offset-top="0">
    <div class="flex justify-center border-b border-gray-300 bg-white">
      <div class="w-300">
        <AppHeader />
      </div>
    </div>
  </a-affix>

  <HomeAiPart />
  <HomeFeaturePart />
  <HomeDownloadPart />
  <HomeOrganizationPart />

  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from '@/components/footer/AppFooter.vue'
import AppHeader from '@/components/header/AppHeader.vue'
import AnnouncementBar from './components/AnnouncementBar.vue'
import HomeAiPart from './components/HomeAiPart.vue'
import HomeFeaturePart from './components/HomeFeaturePart.vue'
import HomeDownloadPart from './components/HomeDownloadPart.vue'
import HomeOrganizationPart from './components/HomeOrganizationPart.vue'
</script>

<style scoped lang="scss"></style>
