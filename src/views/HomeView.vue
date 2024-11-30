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
  <div class="bg-white">
    <div class="mx-auto w-[1200px]">
      <div class="mx-auto flex flex-col items-center justify-between p-16">
        <a-typography-title :level="2">我们的用户</a-typography-title>
        <a-typography-text>为用户创造更多的价值</a-typography-text>
      </div>

      <div class="flex justify-between">
        <div class="flex h-[200px] w-[380px] flex-col justify-between bg-gray-50 p-5" v-for="item in comments">
          <div class="text-base">{{ item.content }}</div>
          <div class="flex items-center">
            <a-avatar :src="item.avatarUrl" :size="40" />
            <div class="ml-4 flex flex-col justify-between">
              <div class="text-lg font-bold">{{ item.name }}</div>
              <div class="text-base">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const comments = ref([
  {
    id: 1,
    name: '张**',
    desc: '产品经理',
    avatarUrl: 'https://pic1.zhimg.com/d8b9a8e63258b35112063570ce821c01_l.jpg',
    content: '已经使用小鸣清单3年了，它已经成为了我的私人助理，能够帮助我安排好工作日程，每天要做什么都清清楚楚的。',
  },
  {
    id: 2,
    name: '张**',
    desc: '产品经理',
    avatarUrl: 'https://pic1.zhimg.com/d8b9a8e63258b35112063570ce821c01_l.jpg',
    content: '已经使用小鸣清单3年了，它已经成为了我的私人助理，能够帮助我安排好工作日程，每天要做什么都清清楚楚的。',
  },
  {
    id: 3,
    name: '张3**',
    desc: '产品经理',
    avatarUrl: 'https://pic1.zhimg.com/d8b9a8e63258b35112063570ce821c01_l.jpg',
    content: '已经使用小鸣清单3年了，它已经成为了我的私人助理，能够帮助我安排好工作日程，每天要做什么都清清楚楚的。',
  },
])
</script>

<style lang="scss" scoped></style>
