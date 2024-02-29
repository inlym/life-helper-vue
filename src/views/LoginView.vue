<template>
  <!-- 跟可视区域等高的容器 -->
  <a-flex class="full-screen" justify="center" align="center">
    <a-flex class="content" vertical align="center">
      <!-- logo SVG 图标 -->
      <img src="/images/logo.svg" />
      <a-typography-title class="title" :level="3">微信登录</a-typography-title>
      <a-typography-text class="desc" type="secondary">使用微信扫一扫登录</a-typography-text>
      <!-- 二维码区域 -->
      <div class="qrcode-area">
        <img class="qrcode" :src="data?.url" alt="" srcset="" />
      </div>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts">
import {getQrCodeInfo} from '@/services/login'
import {useRequest} from 'alova'

const {loading, data, error} = useRequest(getQrCodeInfo)
</script>

<style scoped lang="scss">
.full-screen {
  height: 100vh;

  background: linear-gradient(rgb(255 255 255) 0%, rgb(255 255 255 / 0%) 100%),
    linear-gradient(271.79deg, rgb(0 255 253 / 8%) 1.78%, rgb(236 0 255 / 8%) 50.15%, rgb(255 103 0 / 8%) 98.8%), rgb(255 255 255);

  .content {
    width: 460px;
    height: 600px;
    padding: 60px 40px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow:
      0 4px 8px -4px rgb(0 0 0 / 13%),
      0 6px 16px 0 rgb(0 0 0 / 8%),
      0 12px 24px 16px rgb(0 0 0 / 4%);
    img {
      width: 130px;
    }
    .title {
      margin-top: 40px;
    }
    .desc {
      margin-top: 10px;
    }
    .qrcode-area {
      position: relative;
      padding: 10px;
      margin-top: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 200px;
      width: 200px;

      .qrcode {
        height: 180px;
        width: 180px;
      }
    }
  }
}
</style>
