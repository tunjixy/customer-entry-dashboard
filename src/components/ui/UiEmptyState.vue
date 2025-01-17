<template>
  <div class="flex flex-col items-center justify-center py-10">
    <slot name="illustration">
      <Empty class="size-36" />
    </slot>
    <slot />
  </div>
</template>

<script setup lang="ts">
import Empty from '@/assets/icons/empty.svg'
</script>
