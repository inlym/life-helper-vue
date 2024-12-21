<template>
  <!-- 顶部公告条 -->
  <div v-if="visible" class="bg relative flex h-[30px] items-center justify-center">
    <div class="font-bold">{{ text }}</div>
    <div class="absolute right-1 flex h-[30px] w-[30px] cursor-pointer items-center justify-center" @click="close">
      <CloseOutlined class="text-lg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CloseOutlined} from '@ant-design/icons-vue'
import {ref} from 'vue'

/** 是否可见 */
const visible = ref(true)

/** 公告文本 */
const text = ref('🎉 网站正在 ICP 备案中，暂时停止开放，预计将于1月1日重新上线！')

function close() {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.bg {
  --announcement-bar-color1: #bff3e7;
  --announcement-bar-color2: #eafbf7;
  background: repeating-linear-gradient(
    35deg,
    var(--announcement-bar-color1),
    var(--announcement-bar-color1) 20px,
    var(--announcement-bar-color2) 10px,
    var(--announcement-bar-color2) 40px
  );
  background-color: #fafbfc;
}
</style>
