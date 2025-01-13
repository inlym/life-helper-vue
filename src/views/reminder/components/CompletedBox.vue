<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-8 w-8 cursor-pointer items-center justify-center">
    <MaterialSymbolsCheckBoxRounded v-if="props.completed" class="size-6 text-gray-300" />
    <MaterialSymbolsCheckBoxOutlineBlank v-else class="size-6 text-gray-400" />
  </div>
</template>

<script lang="ts" setup>
import MaterialSymbolsCheckBoxRounded from '~icons/material-symbols/check-box-rounded'
import MaterialSymbolsCheckBoxOutlineBlank from '~icons/material-symbols/check-box-outline-blank'

const props = defineProps({
  /** 是否已完成 */
  completed: {type: Boolean, required: true},
})
</script>

<style lang="scss" scoped></style>
