<template>
  <div class="py-12">
    <div class="wrapper">
      <UserListing />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import UserListing from '@/components/user/UserListing.vue'

// Reusable composable
const app = useAppStore()

app.setPageTitle('Overview')
</script>
