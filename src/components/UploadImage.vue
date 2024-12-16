<template>
  <a-upload :accept :showUploadList="false" :customRequest :maxCount="1">
    <slot></slot>
  </a-upload>
</template>

<script setup lang="ts">
import {uploadImageFile} from '@/api/oss'
import type {UploadRequestOption} from 'ant-design-vue/es/vc-upload/interface'

const emit = defineEmits(['afterUpload'])

const accept = 'image/png,image/jpeg,image/gif,image/webp'

async function customRequest(data: UploadRequestOption) {
  const key = await uploadImageFile(data.file as File)

  // 上传完毕后，触发事件，告知对应的存储路径
  emit('afterUpload', key)
}
</script>

<style scoped lang="scss"></style>
