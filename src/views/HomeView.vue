<template>
  <a-affix :offset-top="0">
    <TheHeader />
  </a-affix>
  <div class="h-[1500px] bg-green-300">Content</div>
  <div class="h-[500px] bg-slate-200" @click="a">Footer</div>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/global/TheHeader.vue'
import {logger} from '@/core/logger'
import {useCounterStore} from '@/stores/counter'
import {reactive, ref} from 'vue'
const counter = useCounterStore()
console.log(counter.count)

function a() {
  counter.increment()
  console.log(counter.count)

  b()
}

function b() {
  logger.debug(__APP_VERSION__)
  logger.info(__LAST_BUILD_TIME__)
}
</script>

<style lang="scss" scoped></style>
