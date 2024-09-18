<template>
  <a-button href="/login" size="large" type="primary">登录</a-button>
  <h1 class="bg-blue text-3xl font-bold underline">Hello world!</h1>
  <a-button @click="onClick">打开弹窗</a-button>
  <LottieAnimation animation-link="https://assets7.lottiefiles.com/packages/lf20_Yc2PU8DdfX.json" :height="300" :width="300" />
</template>

<script lang="ts" setup>
import {showSimpleDialog} from '@/core/view'

function onClick() {
  showSimpleDialog('hello world')
}
</script>

<style lang="scss" scoped></style>
