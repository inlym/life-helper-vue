<template>
  <!-- 底栏 -->
  <div class="flex items-center justify-center bg-gray-50">
    <div class="flex w-300 justify-between p-14">
      <!-- 左边 -->
      <div class="flex w-[300px] flex-col">
        <LogoWithName />
        <div class="mt-2 text-sm">一个生活提效工具</div>
        <div class="mt-6 flex items-center">
          <img class="h-20" src="https://static.weutil.com/web/jMck4Kiksnj7.jpg" alt="公众号二维码" />
          <div class="ml-4 flex h-20 flex-col justify-around">
            <div class="text-sm">微信扫码关注「小鸣 AI」</div>
            <div class="text-xs text-slate-600">了解最新资讯，获得更多信息</div>
          </div>
        </div>
      </div>
      <!-- 右边 -->
      <div class="flex justify-between">
        <div class="w-[160px]">
          <div class="text-base text-slate-600">产品</div>
          <div class="mt-4 flex flex-col justify-between">
            <div class="cursor-pointer text-base">小鸣清单</div>
            <div class="mt-4 cursor-pointer text-base">小鸣 AI</div>
            <div class="mt-4 cursor-pointer text-base">小鸣保险箱</div>
          </div>
        </div>

        <div class="w-[160px]">
          <div class="text-base text-slate-600">服务支持</div>
          <div class="mt-4 flex flex-col justify-between">
            <div class="cursor-pointer text-base">帮助中心</div>
            <div class="mt-4 cursor-pointer text-base">数据安全</div>
            <div class="mt-4 cursor-pointer text-base">服务协议</div>
          </div>
        </div>

        <div class="w-[160px]">
          <div class="text-base text-slate-600">关于</div>
          <div class="mt-4 flex flex-col justify-between">
            <div class="cursor-pointer text-base">关于 WeUtil</div>
            <div class="mt-4 cursor-pointer text-base">联系我们</div>
            <div class="mt-4 cursor-pointer text-base">了解更多</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
