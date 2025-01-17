<template>
  <div class="relative">
    <label class="sr-only" for="search">Search</label>
    <input
      :value="modelValue"
      class="w-full px-3 py-3 pl-12 text-sm bg-white border rounded-full appearance-none border-grey ring-offset-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:select-none disabled:opacity-50"
      type="text"
      :placeholder="placeholder"
      name="search"
      autocomplete="off"
      @input="handleInput"
    />
    <SearchIcon class="absolute left-5 top-4 size-4" />
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import SearchIcon from '@/assets/icons/search.svg'

withDefaults(
  defineProps<{
    placeholder?: string
  }>(),
  {
    placeholder: 'Search',
  },
)

const modelValue = defineModel<string>()
const searchTerm = ref('')

watchEffect(() => {
  modelValue.value = searchTerm.value
})

function handleInput(event: Event) {
  searchTerm.value = (event.target as HTMLInputElement).value
}
</script>
