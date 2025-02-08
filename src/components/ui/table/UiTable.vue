<template>
  <div class="w-full overflow-auto bg-white border rounded-lg border-grey">
    <table class="w-full text-sm border-collapse" :class="props.class">
      <thead>
        <tr class="border-b border-grey hover:bg-grey/35">
          <th
            v-for="(heading, index) in props.headings"
            :key="index"
            class="px-6 py-4 text-xs tracking-wide text-left uppercase align-middle border-b border-l-0 border-r-0 whitespace-nowrap border-grey"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody class="[&_tr:last-child]:border-0">
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ class?: string; headings: string[] }>()
</script>
