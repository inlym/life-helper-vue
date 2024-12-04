<template>
  <!-- 导航条定高不定宽，宽度由外层容器决定 -->
  <div class="flex h-[60px] w-auto items-center justify-between">
    <!-- 左侧区域 -->
    <div class="left-area flex h-full items-center">
      <!-- logo 图片 -->
      <img class="mr-2 h-10" src="/images/logo.png" alt="logo" />
      <a-tooltip>
        <template #title>目前为 Beta 版本，将于公测完毕后发布稳定版本</template>
        <div class="mr-10 mt-2 cursor-help">
          <a-tag color="red">Beta</a-tag>
        </div>
      </a-tooltip>
      <!-- 自适应宽度的间隔区域 -->
      <div class="flex-1"></div>
      <!-- 菜单组 -->
      <a-space>
        <a-button type="text" size="large">首页</a-button>
        <a-button type="text" size="large" @click="showTips">产品</a-button>
        <a-button type="text" size="large" @click="showTips">帮助与支持</a-button>
        <a-button type="text" size="large" @click="showTips">关于</a-button>
      </a-space>
    </div>

    <!-- 右侧区域 -->
    <div class="right-area">
      <a-button type="primary" size="large" @click="showTips">登录</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Modal} from 'ant-design-vue'

function showTips() {
  Modal.info({title: '提示', content: '网站正在 ICP 备案中，暂时停止开放，预计将于1月1日重新上线！', okText: '我知道了'})
}
</script>

<style scoped lang="scss"></style>
