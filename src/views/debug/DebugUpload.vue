<template>
  <a-upload :customRequest>
    <a-button>
      <upload-outlined></upload-outlined>
      Click to Upload
    </a-button>
  </a-upload>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import {message} from 'ant-design-vue'
import {UploadOutlined} from '@ant-design/icons-vue'
import type {UploadChangeParam} from 'ant-design-vue'
import axios from 'axios'
import {getOssPostCredential, uploadImageFile} from '@/api/oss'
import type {UploadRequestOption} from 'ant-design-vue/es/vc-upload/interface'

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`)
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
  }
}

const fileList = ref([])
const headers = {
  'x-ca-abc-111': 'hello world',
}

async function customRequest(option: UploadRequestOption) {
  console.log(option.file)

  uploadImageFile(option.file as File)
}
</script>
