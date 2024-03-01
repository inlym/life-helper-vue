<template>
  <div></div>
</template>

<script setup lang="ts">
import {getChatList} from '@/services/ai-chat'
import {useRequest} from 'alova'

const {loading: listLoading, data: listData} = useRequest(getChatList, {initialData: {list: []}})
</script>

<style scoped lang="scss"></style>
