<template>
  <v-dialog v-model="globalDialog.dialog" width="auto" persistent>
    <v-card width="400" :text="globalDialog.text" title="提示">
      <template v-slot:actions>
        <v-spacer />
        <v-btn class="ms-auto" text="我知道了" @click="globalDialog.hideDialog()"></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useDialog} from '@/stores/global-dialog'

const globalDialog = useDialog()
</script>

<style scoped lang="scss"></style>
