<template>
  <!-- 与屏幕等宽高的容器 -->
  <div class="bg flex h-screen items-center justify-center">
    <!-- 居中的容器 -->
    <div class="flex w-[400px] flex-col gap-4 rounded-lg bg-white p-10 shadow-md">
      <!-- 标题 -->
      <LogoWithName class="mb-16 self-center" />
      <!-- 手机号输入框 -->
      <a-input v-model:value="phone" :maxlength="11" addon-before="+86" placeholder="请输入手机号" size="large" />
      <div class="flex justify-between">
        <!-- 验证码输入框 -->
        <a-input v-model:value="code" :maxlength="6" class="w-auto" placeholder="6位短信验证码" size="large" />
        <div class="ml-4 w-[130px]">
          <!-- [获取验证码]按钮 - btn1 -->
          <a-button id="captcha-button" :disabled="btn1Disabled" :loading="btn1Loading" block size="large">{{ btn1Text }}</a-button>
        </div>
      </div>
      <!-- 撑住高度的空容器 -->
      <div class="h-16"></div>
      <!-- [登录/注册]按钮 - btn2 -->
      <a-button :disabled="btn2Disabled" :loading="btn2.loading" block size="large" type="primary" @click="onBtn2Click">登录 / 注册</a-button>
      <!-- 隐私协议政策 -->
      <PolicyLine v-model:checked="policyChecked" />
    </div>
  </div>

  <!-- ============================== 非页面文档流元素 ============================== -->

  <!-- 页面上预留的渲染验证码的元素 -->
  <div id="captcha-element"></div>
</template>

<script setup lang="ts">
import {loginBySmsCode, sendSms, type IdentityCertificate, type SmsRateLimitExceededResponse} from '@/api/login'
import LogoWithName from '@/components/logo/LogoWithName.vue'
import {StorageKey} from '@/core/constant'
import {BusinessError, EMPTY_FUNCTION} from '@/core/model'
import {useCaptcha} from '@/hooks/useCaptcha'
import {useHttp} from '@/hooks/useHttp'
import {useAuthStore} from '@/stores/auth'
import {useIntervalFn} from '@vueuse/core'
import {message, Modal} from 'ant-design-vue'
import {computed, onUnmounted, reactive, ref} from 'vue'
import {useRouter} from 'vue-router'
import PolicyLine from './components/PolicyLine.vue'

const router = useRouter()
const authStore = useAuthStore()

// ================================= 注册HTTP请求 =================================

// 发送短信验证码
const {loading: loading1, runAsync: runAsync1} = useHttp(sendSms, {onError: EMPTY_FUNCTION})

// 使用短信验证码登录
const {loading: loading2, run: run2} = useHttp(loginBySmsCode, {onSuccess: onHttp2Success})

// ================================== 表单类数据 ===================================

/** 手机号 */
const phone = ref('')

/** 6位纯数字短信验证码 */
const code = ref('')

/** 协议勾选 */
const policyChecked = ref(false)

// =================================== 元素状态 ===================================

/** [获取验证码]按钮 - 是否正在倒计时 */
const clocking = ref(false)

/** [获取验证码]按钮 - 当前是否是首次去点击 */
const firstTime = ref(true)

/** 下一次可以发送短信剩余的等待秒数 */
const remainingSeconds = ref(0)

/** [获取验证码]按钮 - 失效状态 */
const btn1Disabled = computed(() => phone.value.length != 11 || loading1.value || clocking.value)

/** [获取验证码]按钮 - 载入状态 */
const btn1Loading = computed(() => loading1.value)

/** [获取验证码]按钮 - 按钮文字 */
const btn1Text = computed(() => {
  if (clocking.value) {
    return `重新获取(${remainingSeconds.value})`
  } else {
    if (firstTime.value) {
      return '获取验证码'
    } else {
      return '重新获取'
    }
  }
})

/** [登录/注册]按钮 - 失效状态 */
const btn2Disabled = computed(() => phone.value.length != 11 || code.value.length != 6)

/** [登录/注册]按钮 */
const btn2 = reactive({
  disabled: true,
  loading: false,
})

// ===================================== 其他 =====================================

const unload = useCaptcha({
  captchaVerifyCallback: async (captchaVerifyParam: string) => {
    try {
      const result = await runAsync1(phone.value, captchaVerifyParam)

      // 没有报错则说明短信发送成功
      firstTime.value = false
      startClock(60)
      return {captchaResult: true}
    } catch (error: unknown) {
      if (error instanceof BusinessError) {
        if (error.errorCode === 12101) {
          // 验证码校验未通过
          return {captchaResult: false}
        } else if (error.errorCode === 12303) {
          // 短信发送超频
          const remainingSeconds = (error as unknown as SmsRateLimitExceededResponse).remainingSeconds
          const errorMessage = (error as unknown as SmsRateLimitExceededResponse).errorMessage

          Modal.info({title: '提示', content: errorMessage, okText: '我知道了'})
          startClock(remainingSeconds)
        } else {
          // 剩下的其余错误
          Modal.info({title: '提示', content: error.errorMessage, okText: '我知道了'})
        }
      }

      return {captchaResult: true}
    }
  },
})

onUnmounted(() => {
  unload()
})

/**
 * 开始倒计时
 *
 * @param seconds 剩余的描述
 */
function startClock(seconds: number) {
  clocking.value = true
  remainingSeconds.value = seconds

  const {pause, resume, isActive} = useIntervalFn(() => {
    const newValue = remainingSeconds.value - 1
    if (newValue <= 0) {
      clocking.value = false
      remainingSeconds.value = 0
      pause()
    } else {
      remainingSeconds.value = Math.ceil(newValue)
    }
  }, 1000)
}

/** [登录/注册]按钮 - 点击事件 */
function onBtn2Click() {
  if (!policyChecked.value) {
    Modal.confirm({
      title: '用户协议及隐私保护',
      content: '为更好地保护你的合法权益，请阅读并同意《用户协议》和《隐私政策》',
      okText: '同意',
      cancelText: '不同意',
      onOk: () => {
        policyChecked.value = true
        run2(phone.value, code.value)
      },
      onCancel: () => {},
    })
  } else {
    run2(phone.value, code.value)
  }
}

function getRedirectUrl() {
  const redirectUrl = localStorage.getItem(StorageKey.REDIRECT_URL)
  if (redirectUrl) {
    localStorage.removeItem(StorageKey.REDIRECT_URL)
    return redirectUrl
  } else {
    return '/me'
  }
}

async function onHttp2Success(data: IdentityCertificate) {
  authStore.login(data)
  message.success('登录成功！正在为你跳转页面 ...')

  // 都完成了再跳转
  router.replace(getRedirectUrl())
}
</script>

<style scoped lang="scss">
.bg {
  background: radial-gradient(66.06% 66.06% at 0 0, rgba(52, 86, 255, 0.1) 0, rgba(52, 86, 255, 0) 100%),
    radial-gradient(46.32% 67.56% at 52.35% -1%, rgba(255, 122, 146, 0.16) 0, rgba(255, 122, 146, 0) 100%),
    radial-gradient(59.31% 62.11% at 92.4% 0, rgba(122, 247, 255, 0.1) 0, rgba(122, 247, 255, 0) 100%);
}
</style>
