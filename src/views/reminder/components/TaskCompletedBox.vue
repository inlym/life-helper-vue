<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-6 w-6 cursor-pointer items-center justify-center" @click="onClick">
    <CheckSquareFilled v-if="completed" :style />
    <square v-else theme="outline" size="22" fill="#9ca3af" />
  </div>
</template>

<script setup lang="ts">
import {operateTask, ReminderTaskOperation} from '@/api/reminder'
import {useHttp} from '@/hooks/useHttp'
import {CheckSquareFilled} from '@ant-design/icons-vue'
import {Square} from '@icon-park/vue-next'
import {computed, ref} from 'vue'
import {reminderEmitter, ReminderEvent} from '../reminder'

const props = defineProps({
  /** 是否已完成 */
  completed: [Boolean, String],
  /** 任务 ID */
  taskId: {type: Number, required: true},
})

const completed = computed(() => Boolean(props.completed))

const style = ref({
  color: '#9ca3af',
  fontSize: '20px',
})

// ===================================== 注册HTTP请求 =====================================

// 操作任务("完成任务", "取消完成任务")
const {run} = useHttp(operateTask)

// ===================================== 元素状态管理 =====================================

/** 点击组件事件 */
function onClick() {
  if (completed.value) {
    run(props.taskId, ReminderTaskOperation.UNCOMPLETE)
  } else {
    run(props.taskId, ReminderTaskOperation.COMPLETE)
  }

  reminderEmitter.emit(ReminderEvent.TaskEvent)
}
</script>

<style scoped lang="scss"></style>
