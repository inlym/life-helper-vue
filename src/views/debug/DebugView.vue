<template>
  <button @click="start">按钮111111</button>
  <div>{{ JSON.stringify(data) }}</div>
  <div>{{ error }}</div>
  <div>{{ loading }}</div>
  <button @click="change">按钮222222</button>
</template>

<script setup lang="ts">
import {useData} from '@/core/http'
import {debugData} from '@/services/debug'

const {data, error, loading, run} = useData(debugData)

function start() {
  run({name: 'mark', age: 19})
}

function change() {
  run({errorCode: 111, errorMessage: '这是错误消息'})
}
</script>

<style scoped lang="scss"></style>
