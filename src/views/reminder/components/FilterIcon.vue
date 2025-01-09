<template>
  <!-- 过滤器图标 -->
  <div class="flex size-8 items-center justify-center">
    <Icon v-if="props.filter === ReminderFilterType.ALL" :height="22" icon="hugeicons:apple-reminder" />
    <Icon v-else-if="props.filter === ReminderFilterType.INBOX" :height="24" icon="fluent:mail-inbox-all-20-regular" />
    <Icon v-else-if="props.filter === ReminderFilterType.TODAY" :height="24" icon="stash:calendar-end-solid" />
    <Icon v-else-if="props.filter === ReminderFilterType.NEXT_SEVEN_DAYS" :height icon="wpf:future" />
    <Icon v-else-if="props.filter === ReminderFilterType.OVERDUE" :height icon="pajamas:expire" />
    <Icon v-else-if="props.filter === ReminderFilterType.NO_DATE" :height icon="pajamas:calendar-overdue" />
    <Icon v-else-if="props.filter === ReminderFilterType.COMPLETED" :height icon="pajamas:task-done" />
    <Icon v-else icon="hugeicons:apple-reminder" />
  </div>
</template>

<script setup lang="ts">
import {ReminderFilterType} from '@/api/reminder'
import {Icon} from '@iconify/vue'
import {ref} from 'vue'

interface FilterIconProps {
  filter: ReminderFilterType
}

const props = defineProps<FilterIconProps>()

const height = ref(20)
</script>

<style scoped lang="scss"></style>
