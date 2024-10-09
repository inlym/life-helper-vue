<template>
  <div class="bg-slate-200">{{ userInfoStore.nickName }}</div>
  <img :src="userInfoStore.avatarUrl" alt="头像" />
  <button @click="onClick">更新</button>
</template>

<script setup lang="ts">
import {useUserInfoStore} from '@/stores/user-info'

const userInfoStore = useUserInfoStore()

function onClick() {
  userInfoStore.update()
}
</script>

<style scoped lang="scss"></style>
