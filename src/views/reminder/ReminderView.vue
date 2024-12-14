<template>
  <!-- 外层占满屏幕高度的容器，内部分设左、中、右三栏 -->
  <div class="flex h-screen">
    <!-- 左栏，项目及筛选项区域 -->
    <div class="flex w-80 flex-col bg-slate-400 p-4">
      <!-- 顶部筛选区域 -->
      <div class="h-80 bg-gray-200"></div>
      <!-- 我的项目区域 -->
      <div class="mt-6 flex-1 bg-green-100">
        <div class="flex justify-between">
          <div class="h-10 text-base font-bold leading-10 text-slate-700">我的项目</div>
          <PlusOutlined class="w-6" @click="addProjectDialogOpened = true" />
        </div>
      </div>
    </div>
    <!-- 中栏，任务列表区域 -->
    <div class="flex-1"></div>
    <!-- 右栏，任务详情，按需展示 -->
    <div class="w-[800px] bg-red-100"></div>
  </div>

  <!-- 非页面布局流元素 -->
  <AddProjectDialog v-model:open="addProjectDialogOpened" @after-close="handleAddProjectDialogClosed" />
</template>

<script setup lang="ts">
import {getProjectList} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {PlusOutlined} from '@ant-design/icons-vue'
import {computed, ref} from 'vue'
import AddProjectDialog from './components/AddProjectDialog.vue'

// ============================= 注册页面请求 =============================

// 获取项目列表数据
const {data: data1} = useHttp(getProjectList, {manual: false})

/** 待办项目列表 */
const projectList = computed(() => (data1 && data1.value ? data1.value.list : []))

/** 新增项目弹窗是否打开 */
const addProjectDialogOpened = ref(false)

function handleAddProjectDialogClosed(msg: string) {
  console.log(msg)
}
</script>

<style scoped lang="scss"></style>
