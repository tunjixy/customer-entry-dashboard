<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal">
    <h3 class="text-lg font-bold">User Summary</h3>
    <div class="grid grid-cols-2 gap-5 mt-5">
      <div>
        <p class="text-sm text-light-text">First name</p>
        <h6 class="font-bold">{{ user?.firstName }}</h6>
      </div>
      <div>
        <p class="text-sm text-light-text">Last Name</p>
        <h6 class="font-bold">{{ user?.lastName }}</h6>
      </div>
      <div class="col-span-2">
        <p class="text-sm text-light-text">Email</p>
        <h6 class="font-bold">{{ user?.email }}</h6>
      </div>
      <div>
        <p class="text-sm text-light-text">Phone Number</p>
        <h6 class="font-bold">{{ user?.phoneNumber }}</h6>
      </div>
      <div>
        <p class="text-sm text-light-text">State</p>
        <h6 class="font-bold">{{ user?.state }}</h6>
      </div>
      <div>
        <p class="text-sm text-light-text">Status</p>
        <span class="pill" :class="[user?.status === 'active' ? 'pill-success' : 'pill-danger']">
          {{ user?.status }}
        </span>
      </div>
      <div class="col-span-2">
        <p class="text-sm text-light-text">Description</p>
        <div v-html="user?.description" />
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { User } from '@/types/user'
import UiModal from '@/components/ui/UiModal.vue'

defineProps<{
  user: User | null
}>()

// Modal
const modal = ref<InstanceType<typeof UiModal> | null>(null)
function openModal() {
  modal.value?.open()
}
function closeModal() {
  modal.value?.close()
}

defineExpose({
  openModal,
  closeModal,
})
</script>
