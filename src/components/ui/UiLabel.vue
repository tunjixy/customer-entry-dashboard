<template>
  <label class="block mb-1 text-sm text-light-text" :for="label">
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>
