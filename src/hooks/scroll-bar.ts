import {onMounted, ref} from 'vue'

// 用于检测滚动条是否被滚动
export function useScrollBarDetector() {
  /** 滚动条是否滚动 */
  const scrolled = ref(false)

  onMounted(() => {
    window.addEventListener('scroll', () => {
      const distance = document.documentElement.scrollTop

      if (distance > 0 && scrolled.value === false) {
        scrolled.value = true
      }

      if (distance === 0 && scrolled.value === true) {
        scrolled.value = false
      }
    })
  })

  return {scrolled}
}
