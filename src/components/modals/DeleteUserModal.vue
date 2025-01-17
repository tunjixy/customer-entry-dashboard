<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal">
    <div class="flex flex-col items-center justify-center pt-10">
      <InfoIcon class="text-blue-500 size-20" />
      <h2 class="mt-4 font-semibold text-center">Delete User</h2>
      <p class="mt-2 text-center text-light-text">Are you sure you want to delete this user?</p>
      <div class="flex items-center justify-center gap-5 mt-8">
        <UiButton rounded @click="$emit('proceed')"> Yes </UiButton>
        <UiButton variant="outline" rounded @click="closeModal()"> Cancel </UiButton>
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UiModal from '@/components/ui/UiModal.vue'
import InfoIcon from '@/assets/icons/info.svg'
import UiButton from '../ui/UiButton.vue'

defineEmits(['proceed'])

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
