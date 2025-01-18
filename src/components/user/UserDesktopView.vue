<template>
  <div class="mt-10">
    <UiTable>
      <TableHeader>
        <TableRow>
          <TableHead v-for="(title, index) in heading" :key="index">
            {{ title }}
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody v-if="loading">
        <TableRow v-for="i in Array(5).keys()" :key="i">
          <TableCell v-for="j in Array(heading.length).keys()" :key="j">
            <UiSkeleton class="h-6" />
          </TableCell>
        </TableRow>
      </TableBody>

      <TableBody v-else>
        <TableCell v-if="filteredUsers?.length === 0" :colspan="heading.length">
          <UiEmptyState>
            <div v-if="search">
              No search result for "<span class="font-bold text-primary">{{ search }} </span>"
            </div>
            <div v-else>
              No users available
              <UiButton @click="$emit('onAdd')" rounded raised center class="mt-3">
                Add User
              </UiButton>
            </div>
          </UiEmptyState>
        </TableCell>
        <TableRow
          v-for="(user, index) in filteredUsers"
          v-else
          :key="user.id"
          class="cursor-pointer"
          @click="$emit('onView', user.id)"
        >
          <TableCell> {{ index + 1 }}. </TableCell>
          <TableCell class="capitalize">
            {{ user.firstName }}
            {{ user.lastName }}
          </TableCell>
          <TableCell>
            {{ user.email }}
          </TableCell>
          <TableCell>
            {{ user.phoneNumber }}
          </TableCell>
          <TableCell>
            {{ user.state }}
          </TableCell>
          <TableCell>
            <span class="pill" :class="[user.status === 'active' ? 'pill-success' : 'pill-danger']">
              {{ user.status }}
            </span>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-5">
              <button @click.stop="$emit('onEdit', user.id)">
                <EditIcon class="text-blue-500 size-6" />
              </button>
              <button @click.stop="$emit('onDelete', user.id)">
                <DeleteIcon class="text-red-500 size-6" />
              </button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </UiTable>
  </div>
</template>

<script setup lang="ts">
import useUser from '@/composables/useUser'

import UiTable from '../ui/table/UiTable.vue'
import TableHeader from '../ui/table/TableHeader.vue'
import TableBody from '../ui/table/TableBody.vue'
import TableCell from '../ui/table/TableCell.vue'
import TableRow from '../ui/table/TableRow.vue'
import TableHead from '../ui/table/TableHead.vue'
import UiSkeleton from '../ui/UiSkeleton.vue'
import UiEmptyState from '../ui/UiEmptyState.vue'
import UiButton from '../ui/UiButton.vue'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/delete.svg'

defineEmits<{
  onAdd: []
  onView: [id: string]
  onEdit: [id: string]
  onDelete: [id: string]
}>()

// Reusable composables
const { search, loading, filteredUsers } = useUser()

const heading = ['', 'Name', 'Email', 'Phone Number', 'State', 'Status', 'Action']
</script>
