<template>
  <header class="sticky top-0 w-full">
    <nav
      class="h-16 w-full bg-background backdrop-blur-sm backdrop-saturate-[180%] transition-none"
    >
      <div class="wrapper">
        <div class="flex items-center justify-between w-full h-16 gap-2">
          <button @click="$emit('toggle')">
            <MenuIcon class="size-6 lg:hidden" />
          </button>
          <p class="text-sm font-bold tracking-wide uppercase">
            {{ pageTitle }}
          </p>
          <div></div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import MenuIcon from '@/assets/icons/menu.svg'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

defineEmits(['toggle'])

// Reusable composable
const { pageTitle } = storeToRefs(useAppStore())
</script>
