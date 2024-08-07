<script setup lang="ts">
const a = import.meta.env.VITE_REQUEST_BASE_URL
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
