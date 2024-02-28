<template>
  <HomeHeader></HomeHeader>
  <a-flex class="banner-wrapper" justify="center">
    <a-flex class="banner" justify="space-between" align="center">
      <!-- 左侧文字介绍 -->
      <a-flex class="left" vertical>
        <a-typography-title class="title">小鸣助手，为生活赋能</a-typography-title>
        <a-typography-text class="desc" type="secondary" strong>一站式生活提效工具平台</a-typography-text>
        <div class="button">立即免费使用</div>
      </a-flex>
      <!-- 右侧的图片 -->
      <img height="500" src="/images/banner1.svg" />
    </a-flex>
  </a-flex>

  <!-- AI 介绍模块 -->
  <a-flex class="ai-wrapper" justify="center">
    <a-flex class="ai" align="center" vertical>
      <a-typography-title class="title" :level="2">小鸣助手，全面拥抱大模型</a-typography-title>
      <a-typography-text class="desc" type="secondary" strong>开发中，敬请期待</a-typography-text>
      <img src="/images/ai.svg" width="300" />
    </a-flex>
  </a-flex>

  <HomeFooter />
</template>

<script setup lang="ts">
import HomeFooter from '@/components/HomeFooter.vue'
import HomeHeader from '@/components/HomeHeader.vue'
</script>

<style scoped lang="scss">
.banner-wrapper {
  background-color: #edf2f5;
  height: 600px;
  .banner {
    width: var(--lifehelper-main-content-width);
    padding: 0 200px;

    .left {
      margin-left: 40px;
      height: 600px;
      width: 600px;
      padding-top: 136px;
      .title {
        font-size: 42px;
      }
      .desc {
        font-size: 22px;
      }
      .button {
        margin-top: 140px;
        width: 200px;
        height: 60px;
        line-height: 60px;
        background-color: var(--lifehelper-theme-color);
        color: #fff;
        border-radius: 10px;
        font-size: 20px;
        text-align: center;
      }
    }
  }
}
.ai-wrapper {
  background-color: #fff;
  height: 600px;
  padding: 40px 0;
  .ai {
    width: var(--lifehelper-main-content-width);
    .title {
      margin-top: 10px;
    }
    .desc {
      margin-top: 10px;
      font-size: 24px;
    }
    img {
      margin-top: 60px;
    }
  }
}

.title {
  font-size: 40px;
  text-align: center;
}

.items {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    height: 360px;
    padding: 32px 15px 0;
    margin: 0 20px;
    background-color: var(--ming-bg-2);
    border: 1px solid #e9e9e9;
    border-radius: 10px;

    .avatar {
      width: 90px;
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
    }

    .name {
      margin-top: 20px;
      font-size: 16px;
    }

    .desc {
      margin-top: 6px;
      color: var(--ming-text-desc);
    }

    .cont {
      padding: 0 20px;
      margin-top: 20px;
      font-size: 16px;
      line-height: 26px;
    }
  }
}
</style>
