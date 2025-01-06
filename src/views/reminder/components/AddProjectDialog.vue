<template>
  <!-- 新增待办项目弹窗 -->
  <a-modal
    v-model:open="open"
    title="新增项目"
    :okButtonProps="{disabled: btn1Disabled}"
    centered
    :confirmLoading="loading"
    @ok="onOk"
    :maskClosable="false"
    :width="400"
  >
    <a-space class="my-4" direction="vertical">
      <a-input v-model:value="inputProjectName" size="large" placeholder="请输入项目名称" showCount :maxlength="10" />
      <a-typography-text type="secondary">请输入项目名称, 最多10个字</a-typography-text>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {addProject, type ReminderProject} from '@/api/reminder'
import {BusinessError} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {message} from 'ant-design-vue'
import {computed, ref} from 'vue'

/** 对话框是否打开 */
const open = defineModel('open', {required: true})

// ===================================== 注册HTTP请求 =====================================

// 新增待办项目
const {run, loading} = useHttp(addProject, {onSuccess, onError})

// ===================================== 表单绑定数据 =====================================

/** [项目名称]输入框的值 */
const inputProjectName = ref('')

// ===================================== 页面元素状态 =====================================

// #################### 对话框[确定]按钮 - btn1 ####################

const btn1Disabled = computed(() => inputProjectName.value.length === 0 || loading.value)

function onOk() {
  run(inputProjectName.value)
}

// ===================================== 请求回调处理 =====================================

function onSuccess(data: ReminderProject) {
  open.value = false
  message.success(`待办项目 ${data.name} 创建成功`)
}

function onError(error: Error) {
  if (error instanceof BusinessError) {
    // 已经用了弹窗，因此错误提示改为使用全局提示的方式
    message.error(error.errorMessage)
  }
}
</script>
