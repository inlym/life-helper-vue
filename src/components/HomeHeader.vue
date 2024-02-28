<template>
  <a-affix class="affix" @change="affixChange">
    <!-- 包裹顶部导航栏 -->
    <a-flex class="header-wrapper" justify="center" align="center">
      <!-- 顶部导航栏 -->
      <a-flex class="header" justify="space-between" align="center">
        <!-- 左侧的 logo SVG 图标 -->
        <img width="130" src="/images/logo.svg" />
        <!-- 中间的菜单组 -->
        <a-flex class="menus" justify="flex-start">
          <div class="menu-item">首页</div>
          <div class="menu-item">清单</div>
          <div class="menu-item">数据安全</div>
          <div class="menu-item">关于我们</div>
        </a-flex>
        <!-- 右边的操作按钮 -->
        <a-space>
          <div class="button-wrapper"><a-button type="primary" size="large" block>升级会员</a-button></div>
          <div class="button-wrapper"><a-button type="default" size="large" block>登录 / 注册</a-button></div>
        </a-space>
      </a-flex>
    </a-flex>
  </a-affix>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const scrolled = ref(false)

const affixChange = (affixed?: boolean) => {
  scrolled.value = affixed || false
}
</script>

<style scoped lang="scss">
.affix {
  .header-wrapper {
    background-color: #fff;

    .header {
      padding: 0 20px;
      height: 60px;
      width: var(--lifehelper-main-content-width);

      .menus {
        width: 700px;
        font-size: 16px;
        .menu-item {
          text-align: center;
          margin-left: 70px;
        }
      }
      .button-wrapper {
        width: 130px;
      }
    }
  }
}
.scrolled {
  background-color: var(--ming-bg-2);
  box-shadow: 0 10px 40px -15px rgb(64 90 163 / 20%);
}
</style>
