<template>
  <!-- 添加任务操作的输入框 -->
  <div class="mt-2">
    <a-input v-model:value="inputTaskName" size="large" placeholder="请输入待办事件, 按回车键保存" :maxlength="50" @pressEnter="onPressEnter">
      <template #prefix>
        <PlusOutlined :style="{fontSize: '12px'}" />
      </template>
    </a-input>
  </div>
</template>

<script setup lang="ts">
import {addProject} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {PlusOutlined} from '@ant-design/icons-vue'
import {ref} from 'vue'

// ===================================== 注册页面请求 =====================================

// 新增待办任务
const {run, loading} = useHttp(addProject)

// ===================================== 表单绑定数据 =====================================

/** [项目名称]输入框的值 */
const inputTaskName = ref('')

/** 按下回车键的回调 */
function onPressEnter() {
  console.log(`按下了回车键，输入框文本为：${inputTaskName.value}`)
}
</script>

<style scoped lang="scss"></style>
