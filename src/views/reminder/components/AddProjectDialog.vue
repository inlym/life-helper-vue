<template>
  <!-- 新增待办项目弹窗 -->
  <a-modal
    v-model:open="dialog1.open"
    title="新增项目"
    :okButtonProps="{disabled: btn1Disabled}"
    centered
    :confirmLoading="loading"
    @ok="onOk"
    :maskClosable="false"
    :width="400"
    :afterClose
  >
    <a-space class="my-4" direction="vertical">
      <a-input v-model:value="projectName" size="large" placeholder="请输入项目名称" showCount :maxlength="10" />
      <a-typography-text type="secondary">请输入项目名称, 最多10个字</a-typography-text>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {addProject, type ReminderProject} from '@/api/todolist'
import {BusinessError} from '@/core/model'
import {useHttp} from '@/hooks/useHttp'
import {message} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'
import {reminderEventBus, useReminderStore} from '../reminder'

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {dialog1} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 新增待办项目
const {run, loading} = useHttp(addProject, {onSuccess, onError})

// ================================== 表单类数据 ===================================

/** [项目名称]输入框的值 */
const projectName = ref('')

// =================================== 元素状态 ===================================

/** 对话框[确定]按钮是否禁用 */
const btn1Disabled = computed(() => projectName.value.length === 0 || loading.value)

// =================================== 交互事件 ===================================

/** 点击对话框[确定]按钮 */
function onOk() {
  run(projectName.value)
}

/** 关闭对话框后 */
function afterClose() {
  projectName.value = ''
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: ReminderProject) {
  dialog1.value.open = false
  message.success(`待办项目 ${res.name} 创建成功`)
  reminderEventBus.emit({refreshProjectList: true})
  reminderStore.goToProject(res.id)
}

/** 处理请求发生异常情况 */
function onError(error: Error) {
  if (error instanceof BusinessError) {
    // 已经用了弹窗，因此错误提示改为使用全局提示的方式
    message.error(error.errorMessage)
  }
}
</script>
