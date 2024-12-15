<template>
  <a-checkbox v-model:checked="checked">
    <a-typography-text>我已阅读并同意</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/terms" target="_blank">用户协议</a-typography-link>
    <a-typography-text>和</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/privacy" target="_blank">隐私政策</a-typography-link>
  </a-checkbox>
</template>

<script setup lang="ts">
/** 是否勾选协议 */
const checked = defineModel('checked', {required: true})
</script>

<style scoped lang="scss"></style>
