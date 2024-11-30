<template>
  <a-affix :offset-top="0">
    <div class="flex justify-center bg-white">
      <div class="w-[1200px]"><TheHeader /></div>
    </div>
  </a-affix>
  <div class="banner"></div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.banner {
  height: 600px;
  background: rgb(238, 174, 202);
  background: linear-gradient(90deg, rgba(238, 174, 202, 1) 0%, rgba(148, 187, 233, 1) 100%);
}
</style>
