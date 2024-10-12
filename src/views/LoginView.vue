<template>
  <a-flex class="h-screen bg-green-100" justify="center" align="center">
    <a-flex class="rounded-lg bg-white p-10 shadow-lg" justify="start" align="center" vertical>
      <h1 class="mb-12 text-2xl font-bold">小鸣助手</h1>
      <!-- 表单区域 -->
      <a-form ref="formRef" :model="formState" :rules>
        <!-- 表单1：手机号 -->
        <a-form-item name="phone">
          <!-- 手机号输入框 -->
          <a-input v-model:value="formState.phone" :maxlength="11" addon-before="+86" placeholder="请输入手机号" size="large" />
        </a-form-item>
        <!-- 表单2：短信验证码 -->
        <a-form-item name="code">
          <a-flex justify="between" align="center">
            <!-- 验证码输入框 -->
            <a-input v-model:value="formState.code" :maxlength="6" class="w-auto" placeholder="6位短信验证码" size="large" />
            <div class="ml-4 w-[130px]">
              <!-- 【获取验证码】按钮（正常情况） -->
              <a-button v-if="!clocking" :disabled="btn1Disabled" :loading="loading1" block size="large" @click="onBtn1Click">
                {{ smsCounter > 0 ? '重新获取' : '获取验证码' }}
              </a-button>
              <!-- 【获取验证码】按钮（倒计时中） -->
              <a-button v-else block disabled size="large">
                {{ '重新获取(' + restSeconds + ')' }}
              </a-button>
            </div>
          </a-flex>
        </a-form-item>
        <!-- 表单3：提交按钮 -->
        <a-form-item>
          <!-- 登录/注册按钮 [btn2] -->
          <a-button :disabled="btn2Disabled" block class="mt-16" size="large" type="primary" @click="onBtn2Click"> 登录/注册 </a-button>
        </a-form-item>
        <!-- 表单4：协议勾选 -->
        <a-form-item>
          <a-checkbox v-model:checked="formState.policyChecked">
            <a-typography-text>我已阅读并同意</a-typography-text>
            <a-typography-link class="mx-1" href="/policy/terms" target="_blank"> 用户协议 </a-typography-link>
            <a-typography-text>和</a-typography-text>
            <a-typography-link class="mx-1" href="/policy/privacy" target="_blank"> 隐私政策 </a-typography-link>
          </a-checkbox>
        </a-form-item>
      </a-form>
    </a-flex>
  </a-flex>

  <!-- ######################## 非页面文档流元素 ######################## -->

  <!-- 提示勾选协议弹窗 -->
  <a-modal v-model:open="dialog1Open" :maskClosable="false" cancelText="不同意" okText="同意" title="用户协议和隐私政策" width="420px" @ok="confirmDialog1">
    <a-typography-text>为更好地保护你的合法权益，请阅读并同意</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/terms" target="_blank"> 用户协议 </a-typography-link>
    <a-typography-text>和</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/privacy" target="_blank"> 隐私政策 </a-typography-link>
  </a-modal>
</template>

<script lang="ts" setup>
import {type IdentityCertificate, saveIdentityCertificate} from '@/core/auth'
import {useData} from '@/core/http'
import {BusinessError} from '@/core/types'
import {showSimpleDialog} from '@/core/view'
import {loginBySmsCode, sendSms, type SmsRateLimitExceededError} from '@/services/login'
import {useTimestamp} from '@vueuse/core'
import {message} from 'ant-design-vue'
import type {FormInstance, Rule} from 'ant-design-vue/es/form'
import {computed, reactive, ref, watch} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

// ============================= 注册页面请求 =============================

// 发送短信验证码
const {data: data1, error: error1, loading: loading1, run: run1} = useData(sendSms)
// 使用短信验证码登录
const {loading: loading2, run: run2} = useData(loginBySmsCode, {onSuccess: afterLogin})

// ============================= 响应数据处理 =============================

/** 校验码 */
const checkTicket = computed(() => data1.value?.checkTicket)

// 额外处理在“发送验证码”环节出现的非常规错误
watch(error1, (newValue) => {
  if (newValue instanceof BusinessError) {
    if (newValue.errorCode === 11003) {
      setClock((newValue as unknown as SmsRateLimitExceededError).remainingSeconds)
    }
  }
})

/** 使用 [手机号+短信验证码] 的方式登录成功后 */
function afterLogin(cert: IdentityCertificate) {
  saveIdentityCertificate(cert)
  message.success('登录成功，正在跳转中 ...')
  router.push({name: 'home'})
}

// ============================== 表单 ==============================

interface FormState {
  /** 手机号 */
  phone: string
  /** 验证码 */
  code: string
  /** 是否已勾选协议 */
  policyChecked: boolean
}

/** 表单数据 */
const formState = reactive<FormState>({
  phone: '',
  code: '',
  policyChecked: false,
})

/** 表单校验规则 */
const rules: Record<string, Rule[]> = {
  phone: [
    {required: true, message: '请输入手机号', trigger: 'change'},
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      pattern: /^\d{6}$/,
      message: '请输入正确的验证码',
      trigger: 'blur',
    },
  ],
}

const formRef = ref<FormInstance>()

// ============================== 页面元素 ==============================

// @@@@@@@@@@@@@@@@ 【获取验证码】按钮 -> [btn1] @@@@@@@@@@@@@@@@

/** 是否禁用 */
const btn1Disabled = computed(() => !formState.phone || loading1.value || clocking.value)

/** 当前时刻的时间戳（一直在变化） */
const timestamp = useTimestamp()
/** 是否正在倒计时 */
const clocking = ref(false)
/** 开始倒计时时刻的时间戳（一个周期内不变） */
const startClockingTimestamp = ref(0)
/** 开始倒计时时刻剩余的秒数（一个周期内不变） */
const startClockingSeconds = ref(0)
/** 短信发送次数 */
const smsCounter = ref(0)
/** 倒计时剩余秒数 */
const restSeconds = computed(() => Math.floor((startClockingSeconds.value * 1000 - timestamp.value + startClockingTimestamp.value) / 1000))

/** 设置倒计时时钟 */
function setClock(seconds: number) {
  clocking.value = true
  startClockingTimestamp.value = timestamp.value
  startClockingSeconds.value = seconds

  const unwatch = watch(restSeconds, (newValue) => {
    if (newValue <= 0) {
      clocking.value = false
      unwatch()
    }
  })
}

/** 处理按钮点击事件 */
function onBtn1Click() {
  // 表单校验手机号
  formRef.value
    ?.validateFields(['phone'])
    .then(() => {
      // 校验成功处理
      run1(formState.phone)
      smsCounter.value++
      setClock(60)
    })
    .catch(() => {
      // 校验失败处理
      // Do Nothing
    })
}

// @@@@@@@@@@@@@@@@ 【提醒勾选协议】弹窗 -> [dialog1]  @@@@@@@@@@@@@@@@

const dialog1Open = ref(false)

function showDialog1() {
  dialog1Open.value = true
}

/** 点击“确定”按钮 */
function confirmDialog1() {
  dialog1Open.value = false
  formState.policyChecked = true
}

// @@@@@@@@@@@@@@@@ 【登录/注册】按钮 -> [btn2]  @@@@@@@@@@@@@@@@

/** 是否禁用 */
const btn2Disabled = computed(() => !(formState.phone && formState.code) || loading2.value)

function onBtn2Click() {
  console.log(checkTicket.value)
  console.log(formState)
  // 表单校验手机号、验证码
  formRef.value
    ?.validateFields(['phone', 'code'])
    .then(() => {
      // 校验成功处理
      if (!formState.policyChecked) {
        showDialog1()
      } else if (!checkTicket.value) {
        showSimpleDialog('验证码已过期，请重新获取验证码')
      } else {
        run2(checkTicket.value, formState.code)
      }
    })
    .catch(() => {
      // 校验失败处理
      // Do Nothing
    })
}
</script>

<style lang="scss" scoped></style>
