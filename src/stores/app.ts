import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', () => {
  const pageTitle = ref('')

  function setPageTitle(title: string) {
    pageTitle.value = title
  }

  return {
    pageTitle,
    setPageTitle,
  }
})
