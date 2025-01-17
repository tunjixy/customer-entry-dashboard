<template>
  <div class="flex items-center mt-2 text-xs font-bold text-red-500">
    <InfoIcon class="mr-1 text-red-500 size-4 shrink" />
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
import InfoIcon from '@/assets/icons/info-circle.svg'

defineProps<{
  message: string | undefined | null
}>()
</script>
