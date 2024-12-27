<template>
  <!-- 任务详情区域 -->
  <div class="flex h-full w-full flex-col justify-between px-4">
    <!-- “完成”勾选框和截止日期 -->
    <div class="flex h-14 items-center border-b border-gray-200 px-6">
      <a-checkbox v-model:checked="completed" />
      <a-divider class="ml-4" type="vertical" />
      <a-date-picker v-model:value="dueTime" format="M月D日 HH:mm" :bordered="false" placeholder="设置截止时间" mode="date" />
    </div>
    <!-- 任务名称 -->
    <div class="mt-2">
      <!-- 任务名称输入框 -->
      <a-input class="text-xl font-bold" v-model:value="name" placeholder="准备做什么？" :bordered="false" size="large" :maxlength="50" />
    </div>
    <!-- 任务描述 -->
    <div class="mt-1 flex-1">
      <a-textarea
        class="h-[500px] text-base"
        v-model:value="content"
        placeholder="输入任务描述"
        :bordered="true"
        :showCount="textareaShowCount"
        :maxlength="1000"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {getTask, type ReminderTask} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {useReminderStore} from '@/stores/reminder'
import {storeToRefs} from 'pinia'
import {computed, ref, watch} from 'vue'
import dayjs, {Dayjs} from 'dayjs'

const reminderStore = useReminderStore()
const {activeTaskId} = storeToRefs(reminderStore)

// ===================================== 注册页面请求 =====================================

// 获取任务详情
const {data: data1, run: run1} = useHttp(getTask, {onSuccess: onHttp1Success})

// ===================================== 表单绑定数据 =====================================

/** 任务是否完成 */
const completed = ref(false)

/** 任务标题 */
const name = ref('我是标题')

/** 任务内容 */
const content = ref('')

/** 截止时间 */
const dueTime = ref<Dayjs>()

// ===================================== 页面展示数据 =====================================

/** 所属项目 ID */
const projectId = ref<number>()

/** 所属的项目名称 */
const projectName = ref('未分类')

// ===================================== 页面状态数据 =====================================

const textareaShowCount = computed(() => content.value.length > 100)

// ===================================== 请求回调处理 =====================================

function onHttp1Success(res: ReminderTask) {
  completed.value = res.completeTime ? true : false
  name.value = res.name
  content.value = res.content
  dueTime.value = res.dueTime ? dayjs(res.dueTime) : undefined

  projectName.value = res.projectName ? res.projectName : '未分类'
}

// ===================================== 其他 =====================================

watch(activeTaskId, (newId) => {
  if (newId) {
    run1(newId)
  }
})
</script>

<style scoped lang="scss"></style>
