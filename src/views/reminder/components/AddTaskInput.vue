<template>
  <!-- 添加任务操作的输入框 -->
  <div class="py-2">
    <a-input
      v-model:value="inputTaskName"
      size="large"
      placeholder="请输入待办事件, 按回车键保存"
      :disabled="loading"
      :maxlength="50"
      @pressEnter="onPressEnter"
    >
      <template #prefix>
        <PlusOutlined :style="{fontSize: '12px'}" />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import {addTask, type ReminderTask} from '@/api/todolist'
import {useHttp} from '@/hooks/useHttp'
import {PlusOutlined} from '@ant-design/icons-vue'
import {message} from 'ant-design-vue'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'
import {reminderEventBus, useReminderStore} from '../reminder'

// ================================== 跨组件数据 ===================================

const reminderStore = useReminderStore()
const {rawProjectId} = storeToRefs(reminderStore)

// ================================= 注册HTTP请求 =================================

// 新增待办任务
const {run, loading} = useHttp(addTask, {onSuccess})

// ================================== 表单类数据 ===================================

/** [项目名称]输入框的值 */
const inputTaskName = ref('')

// =================================== 交互事件 ===================================

/** 发送请求时传递的项目 ID 值 */
const projectId = computed(() => {
  if (rawProjectId.value.startsWith('filter-')) {
    return 0
  }
  return Number.parseInt(rawProjectId.value)
})

/** 按下回车键的回调 */
function onPressEnter() {
  run(inputTaskName.value, projectId.value)
}

// =================================== 请求回调 ===================================

/** 处理请求成功情况 */
function onSuccess(res: ReminderTask) {
  inputTaskName.value = ''
  message.success('任务添加成功')
  reminderEventBus.emit({refreshAll: true})
  reminderStore.goToTask(res.id)
}
</script>

<style scoped lang="scss"></style>
