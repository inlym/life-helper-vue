import {ReminderFilterType, type ReminderTask} from '@/api/todolist'
import dayjs from 'dayjs'

/** 过滤器函数 */
export type FilterFn = (task: ReminderTask) => boolean

export interface FilterWrapper {
  title: string
  fn: FilterFn
}

/**
 * 获取过滤器名称
 *
 * @param filter 过滤器
 *
 * @date 2025/01/09
 * @since 3.0.0
 */
export function getFilterName(filter: ReminderFilterType) {
  switch (filter) {
    case ReminderFilterType.ALL:
      return '所有'
    case ReminderFilterType.INBOX:
      return '收集箱'
    case ReminderFilterType.TODAY:
      return '今天'
    case ReminderFilterType.NEXT_SEVEN_DAYS:
      return '最近7天'
    case ReminderFilterType.OVERDUE:
      return '已过期'
    case ReminderFilterType.NO_DATE:
      return '无期限'
    case ReminderFilterType.COMPLETED:
      return '已完成'
    default:
      return ''
  }
}

/** 日期过滤器列表 */
const dateFilterWrapperList: FilterWrapper[] = [
  {
    title: '已过期',
    fn: (task) => Boolean(!task.completeTime && task.dueDate && dayjs(task.dueDate).isBefore(dayjs(), 'day')),
  },
  {
    title: '今天',
    fn: (task) => Boolean(!task.completeTime && task.dueDate && dayjs(task.dueDate).isSame(dayjs(), 'day')),
  },
  {
    title: '明天',
    fn: (task) => Boolean(!task.completeTime && task.dueDate && dayjs(task.dueDate).isSame(dayjs().add(1, 'day'), 'day')),
  },
  {
    title: '最近7天',
    fn: (task) =>
      Boolean(
        !task.completeTime &&
          task.dueDate &&
          dayjs(task.dueDate).isBefore(dayjs().add(7, 'day'), 'day') &&
          dayjs(task.dueDate).isAfter(dayjs().add(1, 'day'), 'day'),
      ),
  },
  {
    title: '未来',
    fn: (task) => Boolean(!task.completeTime && task.dueDate && dayjs(task.dueDate).isAfter(dayjs().add(7, 'day'), 'day')),
  },
  {
    title: '无期限',
    fn: (task) => Boolean(!task.completeTime && !task.dueDate),
  },
  {
    title: '已完成',
    fn: (task) => Boolean(task.completeTime),
  },
]

/** 任务组 */
export interface TaskGroup {
  title: string
  list: ReminderTask[]
}

/**
 * 生成按照截止期限生成的任务组列表
 *
 * @param taskList 原始任务列表
 *
 * @since 3.0.0
 * @date 2025/01/14
 */
export function getTaskGroupListByDate(taskList: ReminderTask[]): TaskGroup[] {
  return dateFilterWrapperList
    .map((wrapper) => {
      const list = taskList.filter(wrapper.fn)
      return {
        title: wrapper.title,
        list,
      }
    })
    .filter((group) => group.list.length > 0)
}
