<template>
  <a-modal
    v-model:open="open"
    title="修改昵称"
    :okButtonProps="{disabled: btn1Disabled}"
    centered
    :confirmLoading="loading1"
    :width="400"
    @cancel="OnCancel"
    @ok="onOk"
    :destroyOnClose="true"
    :maskClosable="false"
  >
    <a-space class="my-4" direction="vertical">
      <a-input v-model:value="inputNickName" size="large" placeholder="请输入新的昵称" showCount :maxlength="10" />
      <a-typography-text type="secondary">请输入新的昵称，最多10个字</a-typography-text>
    </a-space>
  </a-modal>
</template>

<script setup lang="ts">
import {updateNickName, type BaseUserInfo} from '@/api/user'
import {useHttp} from '@/hooks/useHttp'
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import {computed, ref} from 'vue'

/** 对话框是否打开 */
const open = defineModel('open', {required: true})

const userStore = useUserStore()
const {nickName} = storeToRefs(userStore)

/** 初始（未改变前）的昵称 */
const initNickName = nickName.value

// ===================================== 注册页面请求 =====================================

// 修改昵称
const {run: run1, loading: loading1} = useHttp(updateNickName, {onSuccess})

// ===================================== 表单绑定数据 =====================================

const inputNickName = ref(initNickName)

// ===================================== 页面元素状态 =====================================

// #################### 对话框[取消]按钮 ####################

function OnCancel() {
  open.value = false
}

// #################### 对话框[确定]按钮 - btn1 ####################

function onOk() {
  run1(inputNickName.value)
}

const btn1Disabled = computed(() => inputNickName.value.length === 0 || inputNickName.value === initNickName)

function onSuccess(info: BaseUserInfo) {
  userStore.save(info)
  open.value = false
}
</script>

<style scoped lang="scss"></style>
