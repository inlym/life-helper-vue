<template>
  <!-- 包裹底部区域 -->
  <a-flex class="footer-wrapper" justify="center">
    <div class="footer-content">
      <!-- 底部区域 -->
      <a-flex class="footer-menu" justify="space-between">
        <div class="logo-area">
          <!-- logo SVG 图标 -->
          <img width="150" src="/logo.svg" />
          <a-flex class="mp-area">
            <img src="/mp_qrcode.jpg" width="80" height="80" alt="" class="mp" />
            <a-flex class="content" justify="space-between" vertical>
              <a-typography-text class="title">微信扫码关注小鸣助手</a-typography-text>
              <a-typography-text class="desc" type="secondary">随时随地，获取更多信息</a-typography-text>
            </a-flex>
          </a-flex>
        </div>
        <a-flex class="menu-column" vertical>
          <a-typography-title class="menu-title" :level="5">产品</a-typography-title>
          <a-typography-text class="menu-name" type="secondary">客户端下载</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">产品功能</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">会员定价</a-typography-text>
        </a-flex>
        <a-flex class="menu-column" vertical>
          <a-typography-title class="menu-title" :level="5">帮助</a-typography-title>
          <a-typography-text class="menu-name" type="secondary">使用指南</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">常见问题</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">功能教程</a-typography-text>
        </a-flex>
        <a-flex class="menu-column" vertical>
          <a-typography-title class="menu-title" :level="5">关于</a-typography-title>
          <a-typography-text class="menu-name" type="secondary">关于我们</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">联系我们</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">意见建议</a-typography-text>
        </a-flex>
        <a-flex class="menu-column" vertical>
          <a-typography-title class="menu-title" :level="5">支持</a-typography-title>
          <a-typography-text class="menu-name" type="secondary">用户协议</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">隐私声明</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">会员协议</a-typography-text>
        </a-flex>
        <a-flex class="menu-column" vertical>
          <a-typography-title class="menu-title" :level="5">开源</a-typography-title>
          <a-typography-text class="menu-name" type="secondary">Github</a-typography-text>
          <a-typography-text class="menu-name" type="secondary">Gitee</a-typography-text>
        </a-flex>
      </a-flex>

      <a-divider />

      <a-flex justify="center">
        <a-typography-text type="secondary">
          © 2018-2024 小鸣网络工作室 - WeUtil.com 保留一切权利 | 备案号：<a-typography-link href="https://beian.miit.gov.cn/" target="_blank">
            浙ICP备2024067463号-1
          </a-typography-link>
        </a-typography-text>
      </a-flex>
    </div>
  </a-flex>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-wrapper {
  background-color: #fbfbfb;
  padding: 40px 10px 20px;
  .footer-menu {
    .logo-area {
      padding: 0 40px;
      width: 400px;

      .mp-area {
        padding: 20px 0;

        .content {
          padding: 10px;
        }
      }
    }
    .menu-column {
      width: 200px;

      .menu-title {
        margin-bottom: 14px;
      }
      .menu-name {
        margin-top: 10px;
      }
      .mp {
        margin-top: 16px;
      }
    }
  }
}
</style>
