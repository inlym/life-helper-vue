<template>
  <!-- 修改项目名称弹窗 -->
  <a-modal
    v-model:open="dialog2.open"
    title="重命名"
    :okButtonProps="{disabled: btn1Disabled}"
    centered
    :confirmLoading="loading"
    @ok="onOk"
    :maskClosable="false"
    :width="400"
  >
    <a-space class="my-4" direction="vertical">
      <a-input v-model:value="dialog2.name" size="large" placeholder="请输入新的项目名称" showCount :maxlength="10" />
      <a-typography-text type="secondary">请输入项目名称, 最多10个字</a-typography-text>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {renameProject, type ReminderProject} from '@/api/todolist'
import {BusinessError} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {message} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'
import {reminderEventBus, useReminderStore} from '../reminder'

// ================================== 跨组件数据 ===================================

const {dialog2} = storeToRefs(useReminderStore())

// ================================= 注册HTTP请求 =================================

// 修改项目名称
const {run, loading} = useHttp(renameProject, {onSuccess, onError})

// =================================== 元素状态 ===================================

// #################### 对话框[确定]按钮 - btn1 ####################

const btn1Disabled = computed(() => dialog2.value.name.length === 0 || loading.value)

function onOk() {
  run(dialog2.value.projectId, dialog2.value.name)
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: ReminderProject) {
  message.success(`名称修改成功`)
  dialog2.value.open = false
  reminderEventBus.emit({refreshProjectList: true})
}

/** 处理请求发生异常情况 */
function onError(error: Error) {
  if (error instanceof BusinessError) {
    // 已经用了弹窗，因此错误提示改为使用全局提示的方式
    message.error(error.errorMessage)
  }
}
</script>
