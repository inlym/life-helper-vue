import {Modal} from 'ant-design-vue'

/**
 * 展示简易弹窗
 * @param message 提示消息
 */
export function showSimpleDialog(message: string) {
  Modal.info({title: '提示', content: message, okText: '我知道了'})
}
