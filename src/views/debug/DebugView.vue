<template>
  <div>
    <button id="captcha-button">点击弹出验证码A</button>
    <div id="captcha-element"></div>
  </div>
</template>

<script setup lang="ts">
import {logger} from '@/core/logger'
import {useCaptcha} from '@/hooks/useCaptcha'
import {onMounted} from 'vue'

let captcha = null

function getInstance(instance: any) {
  captcha = instance
}

async function captchaVerifyCallback(captchaVerifyParam: string) {
  // 1.向后端发起业务请求，获取验证码验证结果和业务结果
  // const result = await xxxx('http://您的业务请求地址', {
  //     captchaVerifyParam: captchaVerifyParam, // 验证码参数
  //     yourBizParam... // 业务参数
  // });
  // return {
  //  captchaResult: true, // 验证码验证是否通过，boolean类型，必选
  //  bizResult: true, // 业务验证是否通过，boolean类型，可选；若为无业务验证结果的场景，bizResult可以为空
  // }
  console.log(typeof captchaVerifyParam)
  console.log(captchaVerifyParam)

  return {
    captchaResult: true,
    bizResult: false,
  }
}

// 验证通过后调用
function onBizResultCallback() {
  console.log('onBizResultCallback')
}

onMounted(() => {
  logger.info('App Version:', __APP_VERSION__)
  logger.info('Build Time:', __LAST_BUILD_TIME__)

  useCaptcha({
    getInstance,
    captchaVerifyCallback,
    onBizResultCallback,
  })
})
</script>

<style scoped lang="scss"></style>
