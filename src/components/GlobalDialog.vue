<template>
  <v-dialog v-model="dialog.show" width="auto" persistent>
    <v-card width="400" :text="dialog.text" :title="dialog.title">
      <template v-slot:actions>
        <v-spacer />
        <v-btn v-if="dialog.showCancel" class="ms-auto" :text="dialog.cancelText" @click="dialog.hideDialog"></v-btn>
        <v-btn
          class="ms-auto"
          :color="dialog.confirmButtonColor"
          :text="dialog.confirmText"
          @click="dialog.hideDialog"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {useDialog} from '@/stores/global-dialog'

const dialog = useDialog()
</script>

<style scoped lang="scss"></style>
