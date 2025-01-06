<template>
  <!-- 是否完成勾选框 -->
  <div class="flex h-8 w-8 items-center justify-center">
    <CheckSquareFilled v-if="completed" :style />
    <square v-else theme="outline" size="22" fill="#9ca3af" />
  </div>
</template>

<script setup lang="ts">
import {CheckSquareFilled} from '@ant-design/icons-vue'
import {Square} from '@icon-park/vue-next'
import {ref} from 'vue'

const {completed} = defineProps({
  /** 是否已完成 */
  completed: {type: Boolean, required: true},
})

const style = ref({
  color: '#9ca3af',
  fontSize: '20px',
})
</script>

<style scoped lang="scss"></style>
