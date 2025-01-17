<template>
  <div class="py-12">
    <div class="wrapper">
      <UserListing
        @on-add="addUser"
        @on-view="viewUser($event)"
        @on-edit="editUser($event)"
        @on-delete="deleteUser($event)"
      />

      <ModifyUserModal ref="modifyUserModal" :is-editing="isEditing" :user="currentUser" />
      <ViewUserModal ref="viewUserModal" :user="currentUser" />
      <DeleteUserModal ref="deleteUserModal" @proceed="proceedToDelete" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/user'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import UserListing from '@/components/user/UserListing.vue'
import ModifyUserModal from '@/components/modals/ModifyUserModal.vue'
import ViewUserModal from '@/components/modals/ViewUserModal.vue'
import DeleteUserModal from '@/components/modals/DeleteUserModal.vue'

// Reusable composables
const app = useAppStore()
const { users } = storeToRefs(useUserStore())
const userStore = useUserStore()

app.setPageTitle('Users Overview')

const currentUser = ref<User | null>(null)
const isEditing = ref(false)

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
