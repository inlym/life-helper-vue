<template>
  <a-popover v-model:open="pop1Open" trigger="click" placement="bottomRight" :getPopupContainer="getPopoverContainer">
    <!-- 弹出区域 -->
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

    <!-- 头像 -->
    <a-avatar class="cursor-pointer" :src="avatarUrl" :size="46" shape="square" />
  </a-popover>
</template>

<script setup lang="ts">
import {isLogined} from '@/core/auth'
import {useAuthStore} from '@/stores/auth'
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {People, Power} from '@icon-park/vue-next'
import {useHttp} from '@/hooks/useHttp'
import {getUserInfo} from '@/api/user'

const router = useRouter()
const route = useRoute()

// ================================== 跨组件数据 ===================================

const authStore = useAuthStore()
const userStore = useUserStore()

const {nickName, avatarUrl, accountId, isAcquired} = storeToRefs(userStore)

// ================================= 注册HTTP请求 =================================

// 请求[1]: 获取用户资料
const {run: run1} = useHttp(getUserInfo, {
  onSuccess(data) {
    userStore.save(data)
  },
})

// =================================== 元素状态 ===================================

/** 浮层是否展示 */
const pop1Open = ref(false)

// 避免弹出组件跟随屏幕滚动
function getPopoverContainer() {
  return document.querySelector('.right-area')
}

// =================================== 交互事件 ===================================

function goToUserHome() {
  pop1Open.value = false

  if (route.path !== '/me') {
    router.push('/me')
  }
}

/** 点击[退出登录] */
function onLogoutBtnClick() {
  pop1Open.value = false
  authStore.logout()
}

// ==================================== 其他 ====================================

onMounted(() => {
  if (!isLogined()) {
    throw new Error('在未登录的情况挂在了 <AvatarWithMenu> 组件')
  }

  if (!isAcquired.value) {
    run1()
  }
})
</script>

<style scoped lang="scss"></style>
