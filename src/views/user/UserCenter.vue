<template>
  <FixedHeader />
  <!-- 与屏幕等宽高的容器 -->
  <div class="flex items-center justify-center bg-gray-100 py-[300px]">
    <!-- 居中的容器 -->
    <div class="flex w-[450px] flex-col rounded-lg bg-white p-10 shadow-md">
      <a-descriptions title="个人资料" :column="1" bordered>
        <a-descriptions-item label="头像">
          <div class="flex items-center justify-between">
            <a-avatar :size="100" :src="userStore.avatarUrl" />
            <UploadAvatar />
          </div>
        </a-descriptions-item>

        <a-descriptions-item label="昵称">
          <div class="flex items-center justify-between">
            <div>{{ userStore.nickName }}</div>
            <a-button @click="dialog1Open = true">修改</a-button>
          </div>
        </a-descriptions-item>

        <a-descriptions-item label="UID">
          <div class="flex items-center justify-between">
            <div>{{ userStore.accountId }}</div>
            <a-button @click="onCopy">复制</a-button>
          </div>
        </a-descriptions-item>
      </a-descriptions>
    </div>
  </div>

  <!-- ============================== 非页面文档流元素 ============================== -->
  <EditNickNameDialog v-model:open="dialog1Open" />
</template>

<script setup lang="ts">
import {useUserStore} from '@/stores/user'
import {useClipboard} from '@vueuse/core'
import {message} from 'ant-design-vue'
import {ref} from 'vue'
import EditNickNameDialog from './components/EditNickNameDialog.vue'
import UploadAvatar from './components/UploadAvatar.vue'

const userStore = useUserStore()

// ===================================== 页面元素状态 =====================================

// #################### [修改昵称]弹窗 - [dialog1] ####################

/** [修改昵称]弹窗 - 是否打开 */
const dialog1Open = ref(false)

function onCopy() {
  const {copy} = useClipboard()
  copy(String(userStore.accountId))
  message.success('复制成功')
}
</script>

<style scoped lang="scss"></style>
