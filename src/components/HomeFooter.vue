<template>
  <div class="footer">
    <span>Copyright © 2019-2024 lifehelper.com.cn 小鸣助手</span>
    <a href="https://beian.miit.gov.cn/"><span>浙ICP备19034536号-5</span></a>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer {
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: var(--ming-text-desc);
  text-align: center;
  background-color: var(--ming-bg-1);

  span {
    margin: 0 10px;
  }

  a {
    color: var(--ming-text-desc);
  }

  a:hover {
    color: var(--ming-text-link);
  }
}
</style>
