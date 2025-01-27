<template>
  <!-- 过滤器图标 -->
  <div class="flex size-8 items-center justify-center">
    <HugeiconsAppleReminder v-if="props.filter === FilterType.ALL" class="size-5" />
    <HeroiconsInbox v-else-if="props.filter === FilterType.INBOX" class="size-5" />
    <StashCalendarEndSolid v-else-if="props.filter === FilterType.TODAY" class="size-6" />
    <WpfFuture v-else-if="props.filter === FilterType.NEXT_SEVEN_DAYS" class="size-5" />
    <PajamasExpire v-else-if="props.filter === FilterType.OVERDUE" class="size-5" />
    <PajamasCalendarOverdue v-else-if="props.filter === FilterType.NO_DATE" class="size-5" />
    <PajamasTaskDone v-else-if="props.filter === FilterType.COMPLETED" class="size-5" />
    <PajamasTaskDone v-else class="size-5" />
  </div>
</template>

<script setup lang="ts">
import {FilterType} from '@/api/todolist'
import HeroiconsInbox from '~icons/heroicons/inbox'
import HugeiconsAppleReminder from '~icons/hugeicons/apple-reminder'
import PajamasCalendarOverdue from '~icons/pajamas/calendar-overdue'
import PajamasExpire from '~icons/pajamas/expire'
import PajamasTaskDone from '~icons/pajamas/task-done'
import StashCalendarEndSolid from '~icons/stash/calendar-end-solid'
import WpfFuture from '~icons/wpf/future'

// =================================== 组件入参 ===================================

interface FilterIconProps {
  filter: FilterType
}

const props = defineProps<FilterIconProps>()
</script>

<style scoped lang="scss"></style>
