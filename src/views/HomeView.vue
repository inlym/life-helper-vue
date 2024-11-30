<template>
  <!-- 顶部导航栏 -->
  <a-affix :offset-top="0">
    <div class="flex justify-center bg-white">
      <div class="w-[1200px]"><TheHeader /></div>
    </div>
  </a-affix>

  <!-- 横幅区域 -->
  <div class="bg-sky-50">
    <div class="mx-auto flex h-[600px] w-[1200px] justify-between">
      <!-- 左侧区域 -->
      <div class="flex flex-col justify-center">
        <a-typography-title :level="2">个人日程管理</a-typography-title>
        <a-typography-text>可互动的日程清单，随时随地管理你的生活</a-typography-text>
        <a-button class="mt-8" size="large" :block="false">免费使用</a-button>
      </div>
      <!-- 右侧区域 -->
      <img src="/images/banner01.png" alt="banner" />
    </div>
  </div>

  <!-- 我们的用户模块 -->
  <div class="bg-cyan-50">
    <div class="i mx-auto flex flex-col items-center justify-between p-16">
      <a-typography-title :level="2">我们的用户</a-typography-title>
      <a-typography-text>为用户创造更多的价值</a-typography-text>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
