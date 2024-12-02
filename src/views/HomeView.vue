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

  <!-- 模块 xxx -->
  <div class="bg-white pb-14">
    <div class="mx-auto w-[1200px]">
      <div class="mx-auto flex flex-col items-center justify-between pb-8 pt-16">
        <a-typography-title :level="2">强大功能，无惧任何挑战</a-typography-title>
        <a-typography-text>真心为用户创造价值</a-typography-text>
      </div>

      <div class="flex flex-wrap justify-between">
        <div class="my-4 flex w-[380px] flex-col items-center justify-between rounded-2xl bg-gray-100 p-5" v-for="item in features">
          <div class="h-25 mb-4 flex flex-col items-center">
            <a-typography-title :level="4">{{ item.title }}</a-typography-title>
            <a-typography-text>{{ item.desc }}</a-typography-text>
          </div>

          <div class="h-60 w-full overflow-hidden">
            <img :src="item.imageUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 我们的用户模块 -->
  <div class="bg-teal-50 pb-14">
    <div class="mx-auto w-[1200px]">
      <div class="mx-auto flex flex-col items-center justify-between p-16">
        <a-typography-title :level="2">我们的用户</a-typography-title>
        <a-typography-text>超过20万的用户认可了我们的价值</a-typography-text>
      </div>

      <div class="flex justify-between">
        <div class="flex h-[200px] w-[380px] flex-col justify-between bg-gray-100 p-5" v-for="item in comments">
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

  <!-- 合作企业 -->
  <div class="bg-red-50 pb-14">
    <div class="mx-auto w-[1200px]">
      <div class="mx-auto flex flex-col items-center justify-between p-16">
        <a-typography-title :level="2">合作企业</a-typography-title>
      </div>

      <div class="flex flex-wrap justify-between">
        <div class="w-[180px] overflow-hidden rounded-xl" v-for="item in companies">
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'

const features = ref([
  {
    id: 1,
    title: '任务与清单',
    desc: '轻松管理所有任务和清单',
    imageUrl: 'https://static.weutil.com/web/CnqPbavDZp4Y.webp',
  },

  {
    id: 2,
    title: '日历',
    desc: '将所有日历事件和任务整理在一个地方',
    imageUrl: 'https://static.weutil.com/web/2Z9XiOi6g5hy.webp',
  },

  {
    id: 3,
    title: '今日计划',
    desc: '今天的计划是什么？',
    imageUrl: 'https://static.weutil.com/web/FBdlyEGHatLv.webp',
  },

  {
    id: 4,
    title: '提醒',
    desc: '设置基于时间、位置的以及重复提醒',
    imageUrl: 'https://static.weutil.com/web/YE6we3mVP2N9.webp',
  },

  {
    id: 5,
    title: '共享清单',
    desc: '让好友一起参与',
    imageUrl: 'https://static.weutil.com/web/eFio6NpYp9t8.webp',
  },

  {
    id: 6,
    title: '模板',
    desc: '在几秒钟内开始使用超过+100个定制模板',
    imageUrl: 'https://static.weutil.com/web/WMr4Ek5JPaRx.webp',
  },
])

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
    name: '王*',
    desc: 'UI设计师',
    avatarUrl: 'https://pic1.zhimg.com/d8b9a8e63258b35112063570ce821c01_l.jpg',
    content: '作为一名打工族，小鸣清单真的帮助了我很多，实话说，已经离不开它了。',
  },
])

const companies = ref([
  'https://static.weutil.com/web/6yffucMBxNlt.png',
  'https://static.weutil.com/web/kbhtaLZQxwGj.png',
  'https://static.weutil.com/web/Vbyky05Uvm5T.png',
  'https://static.weutil.com/web/IpV3oAQQwEzh.png',
  'https://static.weutil.com/web/jOQZQzcYPYVO.png',
  'https://static.weutil.com/web/xh4GDfzxA0eF.png',
])
</script>

<style lang="scss" scoped></style>
