<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-8 w-8 cursor-pointer items-center justify-center">
    <Icon v-if="props.completed" color="#d1d1d1" height="24" icon="material-symbols-light:check-box-rounded" />
    <Icon v-else color="#a3a3a3" height="24" icon="material-symbols-light:check-box-outline-blank" />
  </div>
</template>

<script lang="ts" setup>
import {Icon} from '@iconify/vue'

const props = defineProps({
  /** 是否已完成 */
  completed: {type: Boolean, required: true},
})
</script>

<style lang="scss" scoped></style>
