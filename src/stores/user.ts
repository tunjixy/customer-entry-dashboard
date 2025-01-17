import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/user'

export const useUserStore = defineStore('userStore', () => {
  const users = ref<User[]>([])

  function fetchUsers() {
    users.value = JSON.parse(localStorage.getItem('users') || '[]') as User[] | []
  }

  return {
    users,
    fetchUsers,
  }
})
