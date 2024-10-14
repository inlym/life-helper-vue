<template>
  <div class="bg-slate-200">{{ userInfoStore.nickName }}</div>
  <img :src="userInfoStore.avatarUrl" alt="头像" />
  <button @click="onClick">更新</button>
</template>

<script setup lang="ts">
import {logger} from '@/core/logger'
import {useUserInfoStore} from '@/stores/user-info'
import {onMounted} from 'vue'

const userInfoStore = useUserInfoStore()

function onClick() {
  userInfoStore.update()
}

onMounted(() => {
  logger.info('App Version:', __APP_VERSION__)
  logger.info('Build Time:', __LAST_BUILD_TIME__)
})
</script>

<style scoped lang="scss"></style>
