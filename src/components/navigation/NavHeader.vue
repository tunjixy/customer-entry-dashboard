<template>
  <header class="sticky top-0 w-full">
    <nav
      class="h-16 w-full bg-background backdrop-blur-sm backdrop-saturate-[180%] transition-none"
    >
      <div class="wrapper">
        <div class="flex items-center justify-center w-full h-16 gap-2">
          <p class="text-sm font-bold tracking-wide uppercase">
            {{ pageTitle }}
          </p>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

// Reusable composable
const { pageTitle } = storeToRefs(useAppStore())
</script>
