import mitt from 'mitt'
import {useRoute} from 'vue-router'

export const reminderEmitter = mitt()

export enum ReminderEvent {
  ProjectEvent = 'PROJECT_EVENT',
  TaskEvent = 'TASK_EVENT',
}

export function getRawId() {
  const route = useRoute()
}
