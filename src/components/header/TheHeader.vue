<template>
  <!-- 导航条定高不定宽，宽度由外层容器决定 -->
  <div class="flex h-[60px] w-auto items-center justify-between">
    <!-- 左侧区域 -->
    <div class="left-area flex h-full items-center">
      <!-- logo 图片 -->
      <LogoWithName class="mr-2" />
      <a-tooltip :getPopupContainer="getTooltipContainer">
        <template #title>目前为 Beta 版本，将于公测完毕后发布稳定版本</template>
        <div class="mr-10 mt-2 cursor-help">
          <a-tag color="red">Beta</a-tag>
        </div>
      </a-tooltip>
      <!-- 自适应宽度的间隔区域 -->
      <div class="flex-1"></div>
      <!-- 菜单组 -->
      <a-space>
        <a-button type="text" size="large" @click="goToIndex">首页</a-button>
        <a-button type="text" size="large" @click="showTips">产品</a-button>
        <a-button type="text" size="large" @click="showTips">帮助与支持</a-button>
        <a-button type="text" size="large" @click="showTips">关于</a-button>
      </a-space>
    </div>

    <!-- 右侧区域 -->
    <div class="right-area">
      <!-- 未登录情况 -->
      <a-button v-if="!logined" type="primary" size="large" @click="goToLoginPage">登录 / 注册</a-button>
      <!-- 已登录情况 -->
      <AvatarWithMenu v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {Modal} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {useRouter} from 'vue-router'
import LogoWithName from '../logo/LogoWithName.vue'
import AvatarWithMenu from '../user/AvatarWithMenu.vue'

const router = useRouter()
const authStore = useAuthStore()

const {logined} = storeToRefs(authStore)

function getTooltipContainer() {
  return document.querySelector('.left-area')
}

function goToIndex() {
  router.push('/')
}

function goToLoginPage() {
  router.push('/login')
}

function showTips() {
  Modal.info({title: '提示', content: '网站正在 ICP 备案中，暂时停止开放，预计将于1月1日重新上线！', okText: '我知道了'})
}
</script>

<style scoped lang="scss"></style>
