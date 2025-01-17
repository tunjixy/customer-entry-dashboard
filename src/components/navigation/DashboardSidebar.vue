<template>
  <aside
    class="relative hidden bg-background h-svh lg:fixed lg:bottom-0 lg:left-0 lg:top-0 lg:flex"
  >
    <div class="flex h-full w-[260px] flex-col transition-all">
      <!-- Top -->
      <div class="flex items-center justify-center py-5">
        <img class="h-10" src="@/assets/images/sycamore.png" alt="Sycamore Logo" />
      </div>

      <!-- Menu list -->
      <div class="flex-1 px-3 py-5 overflow-y-auto">
        <SidebarListing :menus="menus" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { Menu } from '@/types/misc'
import SidebarListing from './SidebarListing.vue'

defineProps<{
  menus: Menu[]
}>()
</script>
