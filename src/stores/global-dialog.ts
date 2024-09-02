import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useDialog = defineStore('global-dialog', () => {
  const dialog = ref(false)
  const text = ref('')

  function showDialog(tips: string) {
    dialog.value = true
    text.value = tips
  }

  function hideDialog() {
    dialog.value = false
  }

  return {dialog, text, showDialog, hideDialog}
})
