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
        <!-- 二维码图片 -->
        <a-spin :spinning="loading" size="large"><img class="qrcode" :src="data.url" /></a-spin>
        <!-- 已扫码样式 -->
        <div v-if="status === 2" class="upper">
          <div class="mask"></div>
          <a-flex class="box" vertical justify="space-between" align="center">
            <CheckCircleFilled class="icon" style="font-size: 60px; color: #00b367" /> <a-typography-text class="desc" :level="5">扫码成功</a-typography-text>
          </a-flex>
        </div>
        <!-- 已失效样式 -->
        <div v-if="status === 4" class="upper">
          <div class="mask"></div>
          <a-flex class="box" vertical justify="space-between" align="center">
            <InfoCircleFilled class="icon" style="font-size: 60px; color: #ffc300" />
            <div class="desc">
              <a-typography-text :level="5">已失效，</a-typography-text>
              <a-typography-text class="refresh" :level="5" @click="refresh">点此刷新</a-typography-text>
            </div>
          </a-flex>
        </div>
      </div>
    </a-flex>
  </a-flex>
</template>

<script setup lang="ts">
import {saveIdentityCertificate} from '@/core/auth'
import {StorageKey} from '@/core/storage'
import {checkLoginResult, getQrCodeInfo} from '@/services/login'
import {CheckCircleFilled, InfoCircleFilled} from '@ant-design/icons-vue'
import {useRequest} from 'alova'
import {message} from 'ant-design-vue'
import {ref} from 'vue'
import {useRouter} from 'vue-router'

// (2024.03.01) 此处有一个奇特的 bug，下面这行语句要写在很前面，否则再使用时无法读取 router 的属性
const router = useRouter()

/**
 * 扫码登录状态
 *
 * ### 说明
 * 扫码登录凭据的各个状态的处理策略：
 * 1. [1] -> 被扫码端处理：不变
 * 2. [2] -> 被扫码端处理：增加已扫码样式
 * 3. [3] -> 会包含 IdentityCertificate -> 被扫码端处理：登录成功，进行页面跳转，并且不再继续轮询查询登录结果
 * 4. [4] -> 被扫码端处理：增加已失效样式，并且不再继续轮询查询登录结果
 */
const status = ref<number>(1)

/** 是否继续轮询 */
const polling = ref(true)

const {data, onSuccess, loading} = useRequest(getQrCodeInfo, {initialData: {id: '', url: ''}})

const pollingTask = (id: string) => {
  const timer = setInterval(() => {
    checkLoginResult(id).then((res) => {
      if (res.status === 1 || res.status === 2) {
        status.value = res.status
      } else if (res.status === 3) {
        // 登录成功情况
        polling.value = false
        saveIdentityCertificate(res.certificate)
        clearInterval(timer)

        // TODO: 登录成功后的后续操作
        const targetPath = localStorage.getItem(StorageKey.TargetPathBeforeLogin)
        message.success('登录成功！正在跳转中 ...')
        const path = targetPath ? targetPath : '/dashboard'

        // 延时1秒跳转
        setTimeout(() => {
          router.replace(path)
        }, 1000)
      } else if (res.status === 4) {
        status.value = res.status
        polling.value = false
        clearInterval(timer)
      }
    })
  }, 1000)
}

onSuccess(() => {
  pollingTask(data.value.id)
})

/** 刷新二维码资源 */
const refresh = () => {
  getQrCodeInfo().then((res) => {
    console.log(res)

    data.value = res
    status.value = 1
    polling.value = true
    pollingTask(res.id)
  })
}
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
      margin-top: 60px;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 200px;
      width: 200px;

      .qrcode {
        z-index: 1;
        height: 180px;
        width: 180px;
      }
      .upper {
        position: absolute;
        top: 0;
        left: 0;
        .mask {
          position: absolute;
          top: 0;
          left: 0;
          backdrop-filter: blur(50px);
          height: 198px;
          width: 198px;
          z-index: 10;
        }
        .box {
          padding: 50px 0;
          position: absolute;
          height: 198px;
          width: 198px;
          top: 0;
          left: 0;
          z-index: 99;

          .desc {
            .refresh {
              color: #576b95;
            }
          }
        }
      }
    }
  }
}
</style>
