<template>
  <div class="flex h-screen w-auto items-center justify-center bg-slate-50">
    <div class="w-104 flex flex-col items-center justify-start rounded-lg bg-white p-10 shadow-lg">
      <h1 class="mb-12 text-2xl font-bold">小鸣助手</h1>
      <!-- 表单区域 -->
      <a-form ref="formRef" :model="formState" :rules>
        <!-- 表单1：手机号 -->
        <a-form-item name="phone">
          <!-- 手机号输入框 -->
          <a-input
            v-model:value="formState.phone"
            :maxlength="11"
            addon-before="+86"
            placeholder="请输入手机号"
            size="large"
          />
        </a-form-item>
        <!-- 表单2：短信验证码 -->
        <a-form-item name="code">
          <div class="flex items-center justify-between">
            <!-- 验证码输入框 -->
            <a-input v-model:value="formState.code" :maxlength="6" placeholder="6位短信验证码" size="large" />
            <!-- 获取验证码按钮 -->
            <a-button :disabled="btn1Disabled" :loading="loading1" class="ml-4" size="large" @click="onBtn1Click">
              获取验证码
            </a-button>
          </div>
        </a-form-item>
        <!-- 表单3：提交按钮 -->
        <a-form-item>
          <!-- 登录/注册按钮 -->
          <a-button :disabled="disabledForRegisterButton" block class="mt-16" size="large" type="primary"
            >登录/注册
          </a-button>
        </a-form-item>
        <!-- 表单4：协议勾选 -->
        <a-form-item>
          <a-checkbox v-model:checked="formState.policyChecked">
            <a-typography-text>我已阅读并同意</a-typography-text>
            <a-typography-link class="mx-1" href="/policy/terms" target="_blank">用户协议 </a-typography-link>
            <a-typography-text>和</a-typography-text>
            <a-typography-link class="mx-1" href="/policy/privacy" target="_blank">隐私政策 </a-typography-link>
          </a-checkbox>
        </a-form-item>
      </a-form>
    </div>
  </div>

  <!-- ######################## 非页面文档流元素 ######################## -->

  <!-- 提示勾选协议弹窗 -->
  <a-modal
    v-model:open="policyDialogOpen"
    :maskClosable="false"
    cancelText="不同意"
    okText="同意"
    title="用户协议和隐私政策"
    width="420px"
    @ok="(policyChecked = true), (policyDialogOpen = false)"
  >
    <a-typography-text>为更好地保护你的合法权益，请阅读并同意</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/terms" target="_blank">用户协议 </a-typography-link>
    <a-typography-text>和</a-typography-text>
    <a-typography-link class="mx-1" href="/policy/privacy" target="_blank">隐私政策 </a-typography-link>
  </a-modal>
</template>

<script lang="ts" setup>
import {loginBySmsCode, sendSms} from '@/services/login'
import {computed, reactive, ref, watch} from 'vue'
import {useRequest} from 'vue-request'
import type {FormInstance, Rule} from 'ant-design-vue/es/form'
import {BusinessError} from '@/core/types'
import {Modal} from 'ant-design-vue'

// ============================= 注册页面请求 =============================

// 发送短信验证码
const {data: data1, error: error1, loading: loading1, run: run1} = useRequest(sendSms)
// 使用短信验证码登录
const {data: data2, error: error2, loading: loading2, run: run2} = useRequest(loginBySmsCode)

// ============================= 响应数据处理 =============================

/** 校验码 */
const checkTicket = computed(() => data1.value?.checkTicket)

watch(error1, (newValue) => {
  if (newValue instanceof BusinessError) {
    Modal.warn({title: '提示', content: newValue.errorMessage, okText: '我知道了'})
  }
})

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
  /** 手机号 */
  phone: '',
  /** 验证码 */
  code: '',
  /** 是否已勾选协议 */
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
const btn1Disabled = computed(() => !formState.phone || loading1.value)

/** 处理按钮点击事件 */
const onBtn1Click = () => {
  // 检查手机号是否正确
  formRef.value
    ?.validateFields(['phone'])
    .then(() => {
      // 校验成功处理
      run1(formState.phone)
    })
    .catch(() => {
      // 校验失败处理
      // Do Nothing
    })

  // run1(formState.phone)
}

// @@@@@@@@@@@@@@@@ 【提醒勾选协议】弹窗 -> [dialog1]  @@@@@@@@@@@@@@@@

// @@@@@@@@@@@@@@@@ 【登录/注册】按钮 -> [btn2]  @@@@@@@@@@@@@@@@

/** 是否禁用 */
const disabledForRegisterButton = computed(() => !(formState.phone && formState.code))

/** 弹窗展示状态 */
const dialogOpen4Policy = ref(false)

// ============================== 页面状态 ==============================

/** 勾选协议弹窗展示状态 */
const policyDialogOpen = ref(false)

// ============================== 计算属性 ==============================

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

<style lang="scss" scoped></style>
