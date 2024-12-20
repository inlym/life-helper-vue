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
      <a-button v-if="!logined" type="primary" size="large" @click="goToLoginPage">登录</a-button>
      <!-- 已登录情况 -->
      <a-popover v-model:open="pop1Open" v-else trigger="click" placement="bottomRight" :getPopupContainer="getPopoverContainer">
        <template #content>
          <div class="w-[180px]">
            <!-- 头像、昵称区域 -->
            <div class="flex h-[60px] items-center rounded-md bg-slate-50">
              <!-- 左边放头像，右边放昵称和 UID -->
              <a-avatar class="cursor-pointer" :src="avatarUrl" :size="50" />
              <div class="ml-4 flex flex-1 flex-col items-start justify-between">
                <a-typography-text v-model:content="nickName" strong ellipsis></a-typography-text>
                <a-typography-text type="secondary">uid: {{ accountId }}</a-typography-text>
              </div>
            </div>
            <!-- 菜单列表区域 -->
            <div class="mt-2 pt-2 text-base">
              <div class="flex h-10 cursor-pointer items-center rounded-md pl-4 hover:bg-slate-200" @click="goToUserHome">
                <people theme="outline" size="20" />
                <a-typography-text class="ml-4 text-base">我的主页</a-typography-text>
              </div>
              <div class="my-2 flex h-10 cursor-pointer items-center rounded-md pl-4 hover:bg-slate-200" @click="onLogoutBtnClick">
                <power theme="outline" size="20" />
                <a-typography-text class="ml-4 text-base">退出登录</a-typography-text>
              </div>
            </div>
          </div>
        </template>
        <a-avatar class="cursor-pointer" :src="avatarUrl" :size="46" shape="square" />
      </a-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthStore} from '@/stores/auth'
import {useUserStore} from '@/stores/user'
import {People, Power} from '@icon-park/vue-next'
import {Modal} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import LogoWithName from '../logo/LogoWithName.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const userStore = useUserStore()

const {logined} = storeToRefs(authStore)
const {nickName, avatarUrl, accountId, isAcquired} = storeToRefs(userStore)

if (!isAcquired.value) {
  userStore.updateIfLogined()
}

/** 点击头像后的浮层是否展示 */
const pop1Open = ref(false)

// 避免弹出组件跟随屏幕滚动
function getPopoverContainer() {
  return document.querySelector('.right-area')
}

function getTooltipContainer() {
  return document.querySelector('.left-area')
}

function goToUserHome() {
  pop1Open.value = false

  if (route.path !== '/me') {
    router.push('/me')
  }
}

function goToIndex() {
  router.push('/')
}

function goToLoginPage() {
  router.push('/login')
}

/** 点击[退出登录] */
function onLogoutBtnClick() {
  pop1Open.value = false
  authStore.logout()
}

function showTips() {
  Modal.info({title: '提示', content: '网站正在 ICP 备案中，暂时停止开放，预计将于1月1日重新上线！', okText: '我知道了'})
}
</script>

<style scoped lang="scss"></style>
