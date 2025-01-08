<template>
  <!-- 右侧任务详情区域 -->
  <div class="flex h-full w-full flex-col">
    <!-- 有内容情况 -->
    <template v-if="taskId && data">
      <!-- 第一行 -->
      <div class="flex h-14 items-center border-b">
        <!-- 是否完成勾选框 -->
        <div class="flex h-full w-14 items-center justify-center border-r">
          <CompletedBox :completed="Boolean(data.completeTime)" />
        </div>
        <!-- 截止时间操作按钮 -->
        <div class="ml-4 flex cursor-pointer items-center rounded-md px-4 py-2 hover:bg-gray-100">
          <Calendar fill="#9ca3af" size="18" theme="outline" />
          <div class="ml-2 text-gray-400">设置截止时间</div>
        </div>
      </div>
      <!-- 第二行，任务标题 -->
      <div class="h-14 px-4 pb-2 pt-4">
        <!-- 任务名称输入框 -->
        <a-input v-model:value="data.name" :bordered="false" :maxlength="50" class="text-xl font-bold" placeholder="准备做什么？" size="large" />
      </div>
      <!-- 第三行，任务描述 -->
      <div class="flex-1 px-4" @click="onContentBlockClick">
        <a-textarea
          ref="content-input"
          v-model:value="data.content"
          :bordered="false"
          :maxlength="1000"
          autoSize
          class="h-96 text-base"
          placeholder="输入任务描述"
        />
      </div>
      <!-- 第四行，操作区 -->
      <div class="flex h-12 items-center border-t px-4">
        <div class="flex cursor-pointer items-center rounded-md px-4 py-2 hover:bg-gray-100">
          <div>{{ data.projectName || '未分类' }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {getTaskDetail} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {Calendar} from '@icon-park/vue-next'
import {computed, useTemplateRef, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import CompletedBox from './CompletedBox.vue'

const route = useRoute()
const router = useRouter()

const projectId = computed(() => route.params.projectId as string)
const taskId = computed(() => route.params.taskId as string)

const contentInput = useTemplateRef<HTMLInputElement>('content-input')

// ===================================== 注册HTTP请求 =====================================

// 获取任务详情
const {data, run} = useHttp(getTaskDetail)

watch(
  taskId,
  (newTaskId: string) => {
    if (newTaskId) {
      run(Number.parseInt(taskId.value))
    }
  },
  {immediate: true},
)

function onContentBlockClick() {
  if (contentInput.value) {
    contentInput.value.focus()
  }
}
</script>

<style lang="scss" scoped></style>
