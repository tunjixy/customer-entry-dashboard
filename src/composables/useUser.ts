import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const loading = ref(false)
const search = ref('')

export default function useUser() {
  // Reusable composables
  const userStore = useUserStore()
  const { users } = storeToRefs(useUserStore())

  function fetchUsers() {
    loading.value = true
    setTimeout(() => {
      userStore.fetchUsers()
      loading.value = false
    }, 1000)
  }

  // Filter user
  const filteredUsers = computed(() => {
    if (!search.value) {
      return users.value
    }
    return users.value.filter(
      (user) =>
        user.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(search.value.toLowerCase()) ||
        user.state.toLowerCase().includes(search.value.toLowerCase()) ||
        user.status.toLowerCase().includes(search.value.toLowerCase()),
    )
  })

  return {
    search,
    loading,
    filteredUsers,
    fetchUsers,
  }
}
