<template>
  <div class="w-full overflow-auto bg-white border rounded-lg border-grey">
    <table class="w-full text-sm border-collapse" :class="props.class">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>
