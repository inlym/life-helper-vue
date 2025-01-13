import dayjs from 'dayjs'

const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/**
 * 格式化日期
 *
 * @param date `2025-01-13` 格式的日期字符串
 * @returns 格式化后的日期
 */
export function formatDate(date: string): string {
  const target = dayjs(date)
  const now = dayjs()

  if (target.isSame(now, 'day')) {
    return '今天'
  }
  if (target.isSame(now.subtract(1, 'day'), 'day')) {
    return '昨天'
  }
  if (target.isSame(now.add(1, 'day'), 'day')) {
    return '明天'
  }
  if (target.isAfter(now.startOf('week')) && target.isBefore(now.endOf('week'))) {
    return week[target.day()]
  }
  if (target.isAfter(now.startOf('year')) && target.isBefore(now.endOf('year'))) {
    return target.format('M月D日')
  }

  return target.format('YYYY年M月D日')
}

/**
 * 格式化日期（方法2：长格式）
 *
 * @param date `2025-01-13` 格式的日期字符串
 * @returns 格式化后的日期
 */
export function formatDate2(date: string): string {
  const target = dayjs(date)
  const now = dayjs()
  const diff = target.diff(now, 'day')
  const d = target.isSame(now, 'year') ? target.format('M月D日') : target.format('YYYY年M月D日')

  if (target.isSame(now, 'day')) {
    return `今天, ${d}`
  }
  if (target.isSame(now.subtract(1, 'day'), 'day')) {
    return `昨天, ${d}`
  }
  if (target.isSame(now.add(1, 'day'), 'day')) {
    return `明天, ${d}`
  }

  return `${Math.abs(diff)}天${diff > 0 ? '后' : '前'}, ${d}`
}

/**
 * 格式化时间
 *
 * @param time `01:00:00` 格式的时间字符串
 * @returns 格式化后的时间
 */
export function formatTime(time: string): string {
  return time.substring(0, 5)
}

/**
 * 获取日期颜色
 *
 * @param date `2025-01-13` 格式的日期字符串
 * @returns 日期颜色
 */
export function getDateColor(date: string): string {
  if (dayjs(date).isAfter(dayjs().subtract(1, 'day'), 'day')) {
    return 'text-blue-400'
  }

  return 'text-rose-500'
}
