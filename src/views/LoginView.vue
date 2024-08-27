<template>
  <!-- 与屏幕等大的容器 -->
  <div class="h-screen d-flex justify-center align-center bg-grey-lighten-5 rounded">
    <v-card width="400" elevation="2" class="pa-6">
      <v-card-item>
        <v-card-title class="font-weight-bold text-h5">欢迎使用小鸣助手</v-card-title>
        <v-card-subtitle>我们将为你提供最优质的服务</v-card-subtitle>
      </v-card-item>

      <!-- 输入框区域 -->
      <v-text-field class="mt-8 mx-4" label="请输入你的手机号" variant="outlined"></v-text-field>

      <!-- 双协议勾选 -->
      <v-checkbox v-model="checkbox">
        <template v-slot:label>
          <div class="font-weight-regular text-body-2">
            <span class="text-grey-darken-4">我已阅读并同意</span>
            <span class="mx-1 text-indigo-darken-1">服务协议</span>
            <span class="text-grey-darken-4">和</span>
            <span class="ml-1 text-indigo-darken-1">隐私政策</span>
          </div>
        </template>
      </v-checkbox>

      <!-- “下一步”按钮 -->
      <v-card-actions>
        <v-btn class="text-none my-4 mx-auto" color="green-darken-1" size="x-large" variant="flat" block>
          下一步
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const checkbox = ref(false)
</script>

<style scoped lang="scss"></style>
