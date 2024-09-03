<template>
  <div class="flex h-screen w-auto items-center justify-center bg-slate-50">
    <div class="w-104 flex flex-col items-center justify-start rounded-lg bg-white p-10 shadow-lg">
      <a-space direction="vertical" size="middle">
        <h1 class="mt-4 text-2xl font-bold">小鸣助手</h1>
        <!-- 手机号输入框 -->
        <a-input
          v-model:value="phone"
          addon-before="+86"
          size="large"
          maxlength="11"
          placeholder="请输入手机号"
          class="mt-10"
        />
        <div class="flex items-center justify-between">
          <!-- 验证码输入框 -->
          <a-input v-model="code" size="large" maxlength="6" placeholder="6位短信验证码" />
          <!-- 获取验证码按钮 -->
          <a-button @click="handleSendButtonClick" size="large" class="ml-4 w-28">获取验证码</a-button>
        </div>

        <!-- 登录/注册按钮 -->
        <a-button type="primary" block @click="handleRegisterButtonClick" size="large" class="mt-10"
          >登录/注册</a-button
        >
        <!-- 协议勾选 -->
        <a-checkbox v-model:checked="policyChecked">
          <a-typography-text>我已阅读并同意</a-typography-text>
          <a-typography-link href="/policy/terms" target="_blank" class="mx-1">用户协议</a-typography-link>
          <a-typography-text>和</a-typography-text>
          <a-typography-link href="/policy/privacy" target="_blank" class="mx-1">隐私政策</a-typography-link>
        </a-checkbox>
      </a-space>
    </div>
  </div>

  <!-- 提示勾选协议弹窗 -->
  <a-modal
    v-model:open="policyDialogOpen"
    title="用户协议和隐私政策"
    cancelText="不同意"
    okText="同意"
    width="420px"
    :maskClosable="false"
    @ok="(policyChecked = true), (policyDialogOpen = false)"
  >
    <a-typography-text>为更好地保护你的合法权益，请阅读并同意</a-typography-text>
    <a-typography-link href="/policy/terms" target="_blank" class="mx-1">用户协议</a-typography-link>
    <a-typography-text>和</a-typography-text>
    <a-typography-link href="/policy/privacy" target="_blank" class="mx-1">隐私政策</a-typography-link>
  </a-modal>
</template>

<script setup lang="ts">
import {loginBySmsCode, sendSms} from '@/services/login'
import {computed, ref} from 'vue'
import {useRequest} from 'vue-request'

// ========== 注册页面请求 ==========
// 发送短信验证码
const {data: data1, error: error1, loading: loading1, run: run1} = useRequest(sendSms)
// 使用短信验证码登录
const {data: data2, error: error2, loading: loading2, run: run2} = useRequest(loginBySmsCode)

// ========== 用户输入 ==========
/** 手机号 */
const phone = ref('')
/** 验证码 */
const code = ref('')
/** 是否已勾选协议 */
const policyChecked = ref(false)

// ========== 页面状态 ==========
/** 勾选协议弹窗展示状态 */
const policyDialogOpen = ref(false)

// ========== 计算属性 ==========
/** 校验码 */
const checkTicketId = computed(() => data1.value?.checkTicket)
/** 手机号输入是否正确 */
const isPhoneRight = computed(() => phone.value.length === 11 && phone.value.startsWith('1'))

// ========== 页面点击事件 ==========
const handleSendButtonClick = () => {
  run1(phone.value)
}
const handleRegisterButtonClick = () => {
  if (!policyChecked.value) {
    policyDialogOpen.value = true
  }

  run2(checkTicketId.value!, code.value)
}
</script>

<style scoped lang="scss"></style>
