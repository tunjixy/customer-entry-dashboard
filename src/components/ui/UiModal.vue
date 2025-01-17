<template>
  <teleport to="body">
    <Transition name="modal">
      <div
        v-show="showModal"
        class="relative"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 transition ease-in-out bg-black/75 backdrop-blur-sm"
          aria-hidden="true"
        ></div>

        <div
          class="fixed inset-0 w-screen overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grey"
          @click="closeIfDismissible()"
        >
          <div class="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <Transition name="move-modal">
              <div
                v-if="showModal"
                class="relative w-full overflow-hidden text-left transition-all transform rounded-b-none shadow-xl rounded-t-2xl sm:my-8 sm:max-w-lg sm:rounded-lg"
                @click.stop
              >
                <div class="p-8 bg-white sm:pb-4">
                  <slot />
                  <button v-if="showCloseButton" @click="$emit('close')">
                    <TimesIcon class="absolute mb-5 right-4 top-4 size-6" />
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import TimesIcon from '@/assets/icons/times.svg'

const props = withDefaults(
  defineProps<{
    isBlocking?: boolean
    showCloseButton?: boolean
  }>(),
  {
    isBlocking: false,
    showCloseButton: true,
  },
)

defineEmits(['close'])

onMounted(() => {
  document.addEventListener('keydown', escapeHandler)
})

onUnmounted(() => {
  document.removeEventListener('keydown', escapeHandler)
  document.body.style.removeProperty('overflow')
})

const showModal = ref(false)

const escapeHandler = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && showModal.value) {
    closeIfDismissible()
  }
}

watch(showModal, (value) => {
  if (value) {
    document.body.style.setProperty('overflow', 'hidden')
  } else {
    document.body.style.removeProperty('overflow')
  }
})

function closeIfDismissible() {
  if (!props.isBlocking) {
    close()
  }
}
function open() {
  showModal.value = true
}
function close() {
  showModal.value = false
}

defineExpose({
  open,
  close,
})
</script>
