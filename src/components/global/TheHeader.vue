<template>
  <!-- 导航条定高不定宽，宽度由外层容器决定 -->
  <div class="flex h-[60px] w-auto items-center justify-between">
    <!-- 左侧区域 -->
    <div class="left-area flex h-full items-center">
      <!-- logo 图片 -->
      <img class="mr-2 h-10" src="/images/logo.png" alt="logo" />
      <a-tooltip>
        <template #title>目前处于公测阶段，将于公测完毕后发布稳定版本</template>
        <div class="mr-10 mt-2 text-xs font-bold text-red-500">Beta</div>
      </a-tooltip>
      <!-- 自适应宽度的间隔区域 -->
      <div class="flex-1"></div>
      <!-- 菜单组 -->
      <div class="flex h-full">
        <div class="mx-4 h-full cursor-pointer border-indigo-500 px-2 pt-4 align-middle text-base hover:border-b-4 hover:font-bold">首页</div>
        <div class="mx-4 h-full cursor-pointer border-indigo-500 px-2 pt-4 align-middle text-base hover:border-b-4 hover:font-bold">产品</div>
        <div class="mx-4 h-full cursor-pointer border-indigo-500 px-2 pt-4 align-middle text-base hover:border-b-4 hover:font-bold">帮助与支持</div>
        <div class="mx-4 h-full cursor-pointer border-indigo-500 px-2 pt-4 align-middle text-base hover:border-b-4 hover:font-bold">关于</div>
      </div>
    </div>

    <!-- 右侧区域 -->
    <div class="right-area">
      <a-button type="primary" size="large">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
