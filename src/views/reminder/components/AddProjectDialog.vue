<template>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template>

<script setup lang="ts">
const open = defineModel('open', {required: true})
const emit = defineEmits(['afterClose'])

function handleOk() {
  open.value = false
  emit('afterClose', 'hello')
}
</script>
