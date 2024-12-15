<template>
  <!-- 与屏幕等宽高的容器 -->
  <div class="flex h-screen items-center justify-center bg-gray-100">
    <!-- 居中的容器 -->
    <div class="flex w-[450px] flex-col rounded-lg bg-white p-10 shadow-md">
      <a-descriptions title="个人资料" :column="1" bordered>
        <a-descriptions-item label="头像">
          <a-avatar :size="100" :src="userStore.avatarUrl" />
        </a-descriptions-item>

        <a-descriptions-item label="昵称">
          {{ userStore.nickName }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from '@/stores/user'

const userStore = useUserStore()
</script>

<style scoped lang="scss"></style>
