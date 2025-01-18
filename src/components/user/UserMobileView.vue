<template>
  <div class="mt-10">
    <div v-if="loading" class="border rounded-lg border-grey divide-y-[1px] divide-grey">
      <li
        v-for="i in Array(5).keys()"
        :key="i"
        class="flex items-center justify-between gap-10 px-6 py-2"
      >
        <div class="w-full">
          <UiSkeleton class="w-1/2 h-3" />
          <UiSkeleton class="w-1/4 h-3 mt-2" />
        </div>
        <div class="w-full">
          <UiSkeleton class="w-1/2 h-3" />
          <UiSkeleton class="w-1/4 h-3 mt-2" />
        </div>
      </li>
    </div>

    <UiEmptyState v-else-if="filteredUsers?.length === 0">
      No users available
      <UiButton @click="$emit('onAdd')" rounded raised center class="mt-3"> Add User </UiButton>
    </UiEmptyState>

    <ul v-else class="bg-white border rounded-lg border-grey divide-y-[1px] divide-grey">
      <li
        v-for="user in filteredUsers"
        :key="user.id"
        class="flex items-center justify-between gap-10 px-6 py-3 cursor-pointer hover:bg-grey/50"
        @click="$emit('onView', user.id)"
      >
        <div>
          <h3 class="font-semibold">{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="text-sm text-light-text">{{ user.email }}</p>
        </div>
        <div>
          <span class="pill" :class="[user.status === 'active' ? 'pill-success' : 'pill-danger']">
            {{ user.status }}
          </span>
          <div class="flex items-center gap-5 mt-3">
            <button @click.stop="$emit('onEdit', user.id)">
              <EditIcon class="text-blue-500 size-6" />
            </button>
            <button @click.stop="$emit('onDelete', user.id)">
              <DeleteIcon class="text-red-500 size-6" />
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/composables/useUser'

import UiButton from '../ui/UiButton.vue'
import UiSkeleton from '../ui/UiSkeleton.vue'
import UiEmptyState from '../ui/UiEmptyState.vue'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/delete.svg'

defineEmits<{
  onAdd: []
  onView: [id: string]
  onEdit: [id: string]
  onDelete: [id: string]
}>()

// Reusable composable
const { loading, filteredUsers } = useUser()
</script>
