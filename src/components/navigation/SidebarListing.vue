<template>
  <ul class="space-y-5">
    <li v-for="(menu, index) in menus" :key="index" class="px-5" @click="$emit('close')">
      <router-link
        :to="menu.url"
        class="flex items-center justify-center gap-2 transition-colors hover:text-white"
      >
        <component :is="markRaw(menu.icon)" class="size-5" />
        <span>
          {{ menu.name }}
        </span>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { markRaw } from 'vue'
import type { Menu } from '@/types/misc'

defineProps<{
  menus: Menu[]
}>()

defineEmits(['close'])
</script>
