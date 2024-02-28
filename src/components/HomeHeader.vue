<template>
  <a-affix class="affix" @change="affixChange">
    <!-- 顶部导航栏 -->
    <div class="header one-center" :class="{scrolled}">
      <div class="header-content common-container">
        <div class="left">
          <img :src="logoUrl" class="logo" />
          <div class="title">小鸣助手</div>
        </div>
        <div class="space"></div>
        <div class="menus">
          <div class="menu-item active">首页</div>
          <div class="menu-item" @click="dialog = true">天气</div>
          <div class="menu-item" @click="dialog = true">AI聊天</div>
        </div>
        <div class="space"></div>
        <div class="right">
          <a-button size="middle">登录</a-button>
        </div>
      </div>
    </div>
  </a-affix>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const scrolled = ref(false)
const logoUrl = ref('https://static.lifehelper.com.cn/static/project/logo.svg')
const dialog = ref(false)

const affixChange = (affixed?: boolean) => {
  scrolled.value = affixed || false
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: var(--ming-header-height);
  background-color: transparent;
  transition: all 0.5s linear;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .space {
      flex: 1;
    }

    .left {
      display: flex;

      .logo {
        width: 26px;
        margin-right: 16px;
      }

      .title {
        font-size: 20px;
        font-weight: bold;
      }
    }

    .menus {
      display: flex;
      font-size: 18px;

      .menu-item {
        height: var(--ming-header-height);
        padding: 0 10px;
        margin: 0 50px;
        line-height: var(--ming-header-height);
      }

      .active {
        font-weight: bold;
      }
    }
  }
}

// 滚动条距离顶部 >0px 情况，做了样式强化
.scrolled {
  background-color: var(--ming-bg-2);
  box-shadow: 0 10px 40px -15px rgb(64 90 163 / 20%);
}
</style>
