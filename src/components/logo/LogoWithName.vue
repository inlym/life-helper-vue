<template>
  <div :class="classList" @click="jump">
    <img class="h-full w-auto" :src="imageUrl" alt="logo" />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const router = useRouter()
const route = useRoute()

const c1 = 'flex h-12 items-center'
const c2 = 'flex h-12 items-center cursor-pointer'

/** 图片地址 */
const imageUrl = ref('https://static.weutil.com/logo/logo-2.png')

const classList = route.path === '/' ? ref(c1) : ref(c2)

/** 点击跳转首页 */
function jump() {
  if (route.path !== '/') {
    router.push('/')
  }
}
</script>
