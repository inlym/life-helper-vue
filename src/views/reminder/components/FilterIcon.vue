<template>
  <!-- 过滤器图标 -->
  <div class="flex size-8 items-center justify-center">
    <HugeiconsAppleReminder v-if="props.filter === ReminderFilterType.ALL" :height="22" />
    <FluentMailInboxAll20Regular v-else-if="props.filter === ReminderFilterType.INBOX" :height="24" />
    <StashCalendarEndSolid v-else-if="props.filter === ReminderFilterType.TODAY" :height="24" />
    <WpfFuture v-else-if="props.filter === ReminderFilterType.NEXT_SEVEN_DAYS" :height />
    <PajamasExpire v-else-if="props.filter === ReminderFilterType.OVERDUE" :height icon="pajamas:expire" />
    <PajamasCalendarOverdue v-else-if="props.filter === ReminderFilterType.NO_DATE" :height />
    <PajamasTaskDone v-else-if="props.filter === ReminderFilterType.COMPLETED" :height icon="pajamas:task-done" />
    <PajamasTaskDone v-else />
  </div>
</template>

<script setup lang="ts">
import {ReminderFilterType} from '@/api/reminder'
import HugeiconsAppleReminder from '~icons/hugeicons/apple-reminder'
import FluentMailInboxAll20Regular from '~icons/fluent/mail-inbox-all-20-regular'
import StashCalendarEndSolid from '~icons/stash/calendar-end-solid'
import WpfFuture from '~icons/wpf/future'
import PajamasExpire from '~icons/pajamas/expire'
import PajamasCalendarOverdue from '~icons/pajamas/calendar-overdue'
import PajamasTaskDone from '~icons/pajamas/task-done'
import {ref} from 'vue'

interface FilterIconProps {
  filter: ReminderFilterType
}

const props = defineProps<FilterIconProps>()

const height = ref(20)
</script>

<style scoped lang="scss"></style>
