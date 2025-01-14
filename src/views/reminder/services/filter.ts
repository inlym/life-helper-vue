import type {ReminderTask} from '@/api/reminder'
import dayjs from 'dayjs'

/** 过滤器函数 */
export type FilterFn = (task: ReminderTask) => boolean

export interface FilterWrapper {
  title: string
  fn: FilterFn
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
