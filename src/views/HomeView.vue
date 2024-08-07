<script setup lang="ts">
import { http } from '@/core/http'

const a = import.meta.env.VITE_REQUEST_BASE_URL
http.post('/debug', { name: 'mark', age: 19, good: true }).then(console.table)
</script>

<template>
  <div class="main">
    <div class="one">hello world</div>
  </div>

  <div>{{ a }}</div>
</template>

<style scoped lang="scss">
.main .one {
  border: 1px solid red;
}
</style>
