<template>
  <a-button @click="onClick">点击</a-button>
</template>

<script setup lang="ts">
import {createVNode, h, render} from 'vue'
import FilterIcon from '../reminder/components/FilterIcon.vue'
import {ReminderFilterType} from '@/api/todolist'

// =================================== 组件入参 ===================================

// ================================== 跨组件数据 ===================================

// ================================= 注册HTTP请求 =================================

// ================================== 表单类数据 ===================================

// ================================== 展示类数据 ===================================

// =================================== 元素状态 ===================================

// =================================== 交互事件 ===================================

function onClick() {
  const divDom = document.createElement('div')
  document.querySelector('#app')!.appendChild(divDom)
  const vNode = h(FilterIcon, {filter: ReminderFilterType.INBOX})
  render(vNode, divDom)
}

// =================================== 请求回调 ===================================

// =================================== 事件监听 ===================================
</script>

<style scoped lang="scss"></style>
