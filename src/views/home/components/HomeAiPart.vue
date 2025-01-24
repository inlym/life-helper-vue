<template>
  <!-- AI 介绍部分 -->
  <div class="bg flex w-full items-center justify-center">
    <div class="flex w-300 flex-col items-center py-40">
      <!-- 标题栏 -->
      <div class="flex h-20 items-center justify-center gap-4">
        <div class="text-5xl font-bold">解决复杂难题，只需</div>
        <div id="typed"></div>
      </div>
      <!-- 描述文本 -->
      <div class="mt-2 text-lg text-gray-500">输入你的问题，即刻为你找到解决方案</div>
      <!-- 输入框区域 -->
      <div class="mt-10 flex h-16 w-180 items-center justify-between rounded-2xl border-4 border-purple-600 px-2">
        <MageRobot class="size-8 text-purple-600" />
        <a-input class="h-12" :bordered="false" size="large" v-model:value="input1" placeholder="试试：帮我写一个年终总结" />
        <div class="flex size-10 items-center justify-center rounded-md bg-purple-400">
          <MingcuteSendPlaneFill class="size-6 text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Typed from 'typed.js'
import {onMounted, ref} from 'vue'
import MageRobot from '~icons/mage/robot'
import MingcuteSendPlaneFill from '~icons/mingcute/send-plane-fill'

// =================================== 组件入参 ===================================

// ================================== 跨组件数据 ===================================

// ================================= 注册HTTP请求 =================================

// ================================== 表单类数据 ===================================

const input1 = ref('')

// ================================== 展示类数据 ===================================

// =================================== 元素状态 ===================================

// =================================== 交互事件 ===================================

// =================================== 请求回调 ===================================

// =================================== 生命周期 ===================================

onMounted(() => {
  const typed = new Typed('#typed', {
    strings: ['一句话', '一段文本', '一张图片', '一个视频', '一个手势', '一个动作', '一个声音'],
    typeSpeed: 200,
    backSpeed: 150,
    smartBackspace: false,
    shuffle: true,
    loop: true,
    autoInsertCss: true,
  })
})
</script>

<style scoped lang="scss">
#typed {
  background: linear-gradient(270deg, #d55dff, #964dff 33%, #694dff 66%, #4db4ff);
  color: transparent;
  background-clip: text;
  font-size: 48px;
  font-weight: bold;
}

:deep(.typed-cursor) {
  font-size: 56px;
  padding-bottom: 10px;
  margin-left: -10px;
  background: linear-gradient(270deg, #d55dff, #964dff 33%, #694dff 66%, #4db4ff);
  color: transparent;
  background-clip: text;
}

.bg {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(238, 242, 255, 1) 35%,
    rgba(250, 245, 255, 1) 52%,
    rgba(253, 244, 255, 1) 76%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
