<template>
  <UploadImage @after-upload="afterUpload">
    <a-button>上传</a-button>
  </UploadImage>
</template>

<script setup lang="ts">
import {updateAvatar, type BaseUserInfo} from '@/api/user'
import UploadImage from '@/components/upload/UploadImage.vue'
import {useHttp} from '@/hooks/useHttp'
import {useUserStore} from '@/stores/user'

const userStore = useUserStore()

// ===================================== 注册页面请求 =====================================

// 更新头像
const {run: run1} = useHttp(updateAvatar, {onSuccess})

function afterUpload(key: string) {
  run1(key)
}

function onSuccess(info: BaseUserInfo) {
  userStore.save(info)
}
</script>

<style scoped lang="scss"></style>
