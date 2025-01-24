<template>
  <!-- 合作企业模块 -->
  <div class="flex w-full items-center justify-center py-20">
    <div class="flex w-300 flex-col items-center">
      <div class="text-3xl font-bold">百万团队正在使用小鸣助手</div>
      <Vue3Marquee class="mt-8">
        <div v-for="item in companies" class="flex h-24 w-46 items-center justify-center rounded-md">
          <img :src="item" />
        </div>
      </Vue3Marquee>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Vue3Marquee} from 'vue3-marquee'

const companies = [
  'https://static.weutil.com/web/6yffucMBxNlt.png',
  'https://static.weutil.com/web/kbhtaLZQxwGj.png',
  'https://static.weutil.com/web/Vbyky05Uvm5T.png',
  'https://static.weutil.com/web/IpV3oAQQwEzh.png',
  'https://static.weutil.com/web/jOQZQzcYPYVO.png',
  'https://static.weutil.com/web/AfuwZ276rRiW.png',
  'https://static.weutil.com/web/45MrGIDtL0aR.png',
]
</script>

<style scoped lang="scss"></style>
