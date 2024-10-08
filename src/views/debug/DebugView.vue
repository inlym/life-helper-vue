<template>
  <div>{{ JSON.stringify(data) }}</div>
  <div>{{ error }}</div>
  <div>{{ loading }}</div>
</template>

<script setup lang="ts">
import {useData} from '@/core/http'
import {getOssPostCredential} from '@/services/oss'

const {data, error, loading} = useData(getOssPostCredential, {defaultParams: ['jpg'], manual: false})
</script>

<style scoped lang="scss"></style>
