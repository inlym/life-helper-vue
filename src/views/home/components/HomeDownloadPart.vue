<template>
  <!-- AI 介绍部分 -->
  <div class="flex w-full items-center justify-center bg-slate-500">
    <div class="flex w-300 flex-col items-center py-20">
      <div class="colorful-text text-3xl font-bold">全端覆盖</div>
      <div class="mt-4 text-3xl font-bold text-gray-100">满足你在任意设备上使用</div>
      <div class="mt-16 flex items-center justify-between">
        <div v-for="item in list" :key="item.imgUrl" class="flex h-40 w-40 flex-col items-center gap-6">
          <img class="size-20" :src="item.imgUrl" />
          <div class="flex h-10 w-36 cursor-pointer items-center justify-center rounded-xl border-2 hover:bg-black hover:text-white">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ================================== 展示类数据 ===================================

const list = [
  {text: '下载 iOS 端', imgUrl: 'https://static.weutil.com/web/wes308zm0r7t.svg'},
  {text: '下载 Android 版', imgUrl: 'https://static.weutil.com/web/31uzadacvoyi.svg'},
  {text: '下载 iPad 版', imgUrl: 'https://static.weutil.com/web/4ptdng4g9z7h.svg'},
  {text: '下载 macOS 版', imgUrl: 'https://static.weutil.com/web/tdnct4jd3rr8.svg'},
  {text: '下载 Windows 版', imgUrl: 'https://static.weutil.com/web/nm5xomndgffe.svg'},
  {text: 'Chrome 插件', imgUrl: 'https://static.weutil.com/web/dk7v9h6v6eo0.svg'},
]
</script>

<style scoped lang="scss">
.colorful-text {
  background: linear-gradient(270deg, #d55dff, #964dff 33%, #694dff 66%, #4db4ff);
  color: transparent;
  background-clip: text;
}
</style>
