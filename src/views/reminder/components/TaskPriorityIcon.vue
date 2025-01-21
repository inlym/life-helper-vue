<template>
  <!-- 优先级图标 -->
  <div class="flex size-6 items-center justify-center pr-0.5">
    <IconamoonFlagFill class="size-5 text-red-500" v-if="props.priority === Priority.HIGH" />
    <IconamoonFlagFill class="size-5 text-yellow-500" v-if="props.priority === Priority.MEDIUM" />
    <IconamoonFlagFill class="size-5 text-blue-500" v-if="props.priority === Priority.LOW" />
    <IconamoonFlagLight class="size-5 text-gray-500" v-if="props.priority === Priority.NONE" />
  </div>
</template>

<script setup lang="ts">
import {Priority} from '@/api/reminder'
import IconamoonFlagFill from '~icons/iconamoon/flag-fill'
import IconamoonFlagLight from '~icons/iconamoon/flag-light'

// =================================== 组件入参 ===================================

interface TaskPriorityIconProps {
  priority: Priority
}

const props = defineProps<TaskPriorityIconProps>()
</script>

<style scoped lang="scss"></style>
