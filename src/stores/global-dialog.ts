import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

/** 弹窗选项 */
export interface DialogOptions {
  /** 弹窗标题 */
  title?: string
  /** 弹窗内容 */
  text?: string
  /** 是否显示取消按钮 */
  showCancel?: boolean
  /** 取消按钮的文字 */
  cancelText?: string
  /** 确认按钮的文字 */
  confirmText?: string
}

export const useDialog = defineStore('global-dialog', () => {
  /** 弹窗是否展示 */
  const show = ref(false)
  /** 弹窗标题 */
  const title = ref('提示')
  /** 弹窗内容 */
  const text = ref('')
  /** 是否显示取消按钮 */
  const showCancel = ref(false)
  /** 取消按钮的文字 */
  const cancelText = ref('取消')
  /** 确认按钮的文字 */
  const confirmText = ref('确定')

  /** 确认按钮的颜色 */
  const confirmButtonColor = computed(() => (showCancel.value ? 'primary' : ''))

  /** 打开弹窗 */
  function showDialog(options: DialogOptions) {
    show.value = true

    if (options.title !== undefined) {
      title.value = options.title
    }
    if (options.text !== undefined) {
      text.value = options.text
    }
    if (options.showCancel !== undefined) {
      showCancel.value = options.showCancel
    }
    if (options.cancelText !== undefined) {
      cancelText.value = options.cancelText
    }
    if (options.confirmText !== undefined) {
      confirmText.value = options.confirmText
    }
  }

  /** 打开简易弹窗 */
  function showSimpleDialog(tips: string) {
    show.value = true
    text.value = tips
    showCancel.value = false
    confirmText.value = '我知道了'
  }

  /** 隐藏弹窗 */
  function hideDialog() {
    show.value = false
  }

  return {
    show,
    title,
    text,
    showCancel,
    cancelText,
    confirmText,
    confirmButtonColor,
    showDialog,
    showSimpleDialog,
    hideDialog,
  }
})
