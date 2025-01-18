<template>
  <div>
    <div class="flex items-center justify-between gap-5">
      <div>
        <p class="text-light-text">Users</p>
        <span class="text-6xl font-bold text-primary">{{ users.length }}</span>
      </div>
      <UiButton v-if="users.length" @click="addUser" raised rounded class="flex items-center gap-3">
        <PlusIcon class="size-6" />
        Add User
      </UiButton>
    </div>

    <div class="max-w-lg mx-auto mt-5 mb-10">
      <UiSearch v-model="search" />
      <div v-if="search && filteredUsers.length" class="mt-3 text-center text-light-text">
        Showing search results for "<span class="font-bold text-primary">{{ search }} </span>"
      </div>
    </div>

    <UserDesktopView
      v-if="isDesktop"
      @on-add="addUser"
      @on-view="viewUser($event)"
      @on-edit="editUser($event)"
      @on-delete="deleteUser($event)"
    />
    <UserMobileView
      v-else
      @on-add="addUser"
      @on-view="viewUser($event)"
      @on-edit="editUser($event)"
      @on-delete="deleteUser($event)"
    />

    <ModifyUserModal ref="modifyUserModal" :is-editing="isEditing" :user="currentUser" />
    <ViewUserModal ref="viewUserModal" :user="currentUser" />
    <DeleteUserModal ref="deleteUserModal" :user="currentUser" @proceed="proceedToDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/user'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import useUser from '@/composables/useUser'

import UiSearch from '../ui/UiSearch.vue'
import ModifyUserModal from '@/components/modals/ModifyUserModal.vue'
import ViewUserModal from '@/components/modals/ViewUserModal.vue'
import DeleteUserModal from '@/components/modals/DeleteUserModal.vue'
import UserDesktopView from './UserDesktopView.vue'
import UserMobileView from './UserMobileView.vue'
import PlusIcon from '@/assets/icons/plus.svg'
import UiButton from '../ui/UiButton.vue'

// Reusable composables
const breakpoints = useBreakpoints(breakpointsTailwind)
const { users } = storeToRefs(useUserStore())
const userStore = useUserStore()
const { search, fetchUsers, filteredUsers } = useUser()

const isDesktop = breakpoints.greater('lg')
const currentUser = ref<User | null>(null)
const isEditing = ref(false)

fetchUsers()

// View user
const viewUserModal = ref<InstanceType<typeof ViewUserModal> | null>(null)
function viewUser(id: string) {
  currentUser.value = users.value.find((user) => user.id === id) as User
  viewUserModal.value?.openModal()
}

// Add/Edit user
const modifyUserModal = ref<InstanceType<typeof ModifyUserModal> | null>(null)
function addUser() {
  isEditing.value = false
  currentUser.value = null
  modifyUserModal.value?.openModal()
}
function editUser(id: string) {
  isEditing.value = true
  currentUser.value = users.value.find((user) => user.id === id) as User
  modifyUserModal.value?.openModal()
}

// Delete user
const deleteUserModal = ref<InstanceType<typeof DeleteUserModal> | null>(null)
function deleteUser(id: string) {
  currentUser.value = users.value.find((user) => user.id === id) as User
  deleteUserModal.value?.openModal()
}
function proceedToDelete() {
  const userIndex = users.value.findIndex((user) => user.id === currentUser.value?.id)
  users.value.splice(userIndex, 1)
  localStorage.setItem('users', JSON.stringify(users.value))
  userStore.fetchUsers()
  deleteUserModal.value?.closeModal()
}
</script>
