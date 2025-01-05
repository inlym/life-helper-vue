<template>
  <!-- 修改项目名称弹窗 -->
  <a-modal
    v-model:open="open"
    title="重命名"
    :okButtonProps="{disabled: btn1Disabled}"
    centered
    :confirmLoading="loading"
    @ok="onOk"
    :maskClosable="false"
    :width="400"
  >
    <a-space class="my-4" direction="vertical">
      <a-input v-model:value="inputProjectName" size="large" placeholder="请输入新的项目名称" showCount :maxlength="10" />
      <a-typography-text type="secondary">请输入项目名称, 最多10个字</a-typography-text>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {renameProject, type ReminderProject} from '@/api/reminder'
import {BusinessError} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {useReminderStore} from '@/stores/reminder'
import {message} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {computed, ref, watch} from 'vue'

/** 对话框是否打开 */
const open = defineModel('open', {required: true})

const reminderStore = useReminderStore()
const {activeProject} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 修改项目名称
const {run, loading} = useHttp(renameProject, {onSuccess: onHttpSuccess, onError: onHttpError})

// ===================================== 表单绑定数据 =====================================

/** [项目名称]输入框的值 */
const inputProjectName = ref('')

// ===================================== 页面元素状态 =====================================

// #################### 对话框[确定]按钮 - btn1 ####################

const btn1Disabled = computed(() => inputProjectName.value.length === 0 || loading.value)

function onOk() {
  run(activeProject.value!.id, inputProjectName.value)
}

// ===================================== 请求回调处理 =====================================

function onHttpSuccess(data: ReminderProject) {
  open.value = false
  message.success(`待办项目名称修改成功`)
  reminderStore.update()
}

function onHttpError(error: Error) {
  if (error instanceof BusinessError) {
    // 已经用了弹窗，因此错误提示改为使用全局提示的方式
    message.error(error.errorMessage)
  }
}

// ===================================== 请求回调处理 =====================================

watch(open, () => {
  inputProjectName.value = activeProject.value!.name
})
</script>
