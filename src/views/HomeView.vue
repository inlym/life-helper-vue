<template>
  <a-layout>
    <a-layout-header class="header">
      <a-button type="primary">Primary Button</a-button>
    </a-layout-header>
    <a-layout-content class="content">
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
      <div class="box"></div>
    </a-layout-content>
    <a-layout-footer class="footer">Footer</a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.header {
  background-color: red;
}

.content {
  background-color: #eee;
  .box {
    height: 300px;
    width: 300px;
    margin: 100px;
    background-color: green;
  }
}

.footer {
  background-color: orange;
}
</style>
