<template>
  <UiModal ref="modal" :is-blocking="true" @close="closeModal">
    <h3 class="text-lg font-bold">
      {{ isEditing ? 'Edit User' : 'Create User' }}
    </h3>
    <form class="mt-5" @submit.prevent="onSubmit">
      <div>
        <UiTextInput
          name="firstname"
          label="Firstname"
          type="text"
          v-model="fields.firstname.value"
          @input="validateField('firstname')"
          @keypress="markFieldAsTouched('firstname')"
          :error-message="fields.firstname.error"
        />
      </div>
      <div class="mt-5">
        <UiTextInput
          name="lastname"
          label="Lastname"
          type="text"
          v-model="fields.lastname.value"
          @input="validateField('lastname')"
          @keypress="markFieldAsTouched('lastname')"
          :error-message="fields.lastname.error"
        />
      </div>
      <div class="mt-5">
        <UiTextInput
          name="email"
          label="Email Address"
          type="email"
          v-model="fields.email.value"
          @input="validateField('email')"
          @keypress="markFieldAsTouched('email')"
          :error-message="fields.email.error"
        />
      </div>
      <div class="mt-5">
        <UiTextInput
          name="phoneNumber"
          label="Phone number"
          type="tel"
          mode="tel"
          v-model="fields.phoneNumber.value"
          @input="validateField('phoneNumber')"
          @keypress="markFieldAsTouched('phoneNumber')"
          :error-message="fields.phoneNumber.error"
        />
      </div>
      <div class="mt-5">
        <UiLabel label="State" />
        <select
          @keypress="markFieldAsTouched('state')"
          v-model="fields.state.value"
          required
          class="form-input-select"
        >
          <option disabled selected value="">Select state</option>
          <option v-for="state in states" :key="state.name" :value="state.name">
            {{ state.name }}
          </option>
        </select>
        <UiFormError v-show="fields.state.error" :message="fields.state.error" />
      </div>
      <div class="mt-5">
        <UiLabel label="Description" />
        <TipTapEditor v-model="fields.description.value as string" />
        <UiFormError v-show="fields.description.error" :message="fields.description.error" />
      </div>
      <div class="mt-5">
        <UiLabel label="Status" />
        <label for="status" name="status" class="inline-flex items-center gap-3 cursor-pointer">
          <input id="status" v-model="isUserActive" class="form-input-checkbox" type="checkbox" />
          <span class="text-sm">Is user active</span>
        </label>
      </div>
      <UiButton
        :disabled="!isFormValid"
        :loading="loading"
        full
        class="mt-8"
        type="submit"
        rounded
        raised
      >
        {{ loading ? '' : isEditing ? 'Update' : 'Submit' }}
      </UiButton>
    </form>
  </UiModal>
</template>

<script lang="ts" setup>
import { ref, useId, watch } from 'vue'
import type { User } from '@/types/user'
import UiModal from '@/components/ui/UiModal.vue'
import UiLabel from '../ui/UiLabel.vue'
import UiFormError from '../ui/UiFormError.vue'
import UiTextInput from '../ui/UiTextInput.vue'
import UiButton from '../ui/UiButton.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import TipTapEditor from '../TipTapEditor.vue'

const { isEditing, user } = defineProps<{
  user: User | null
  isEditing: boolean
}>()

// Reusable composable
const userStore = useUserStore()
const { users } = storeToRefs(useUserStore())
const { fields, validateField, markFieldAsTouched, resetForm, isFormValid } = useFormValidation({
  firstname: {
    value: '',
    rules: [(value) => (value ? null : 'Firstname is required')],
    error: null,
    touched: false,
  },
  lastname: {
    value: '',
    rules: [(value) => (value ? null : 'Lastname is required')],
    error: null,
    touched: false,
  },
  email: {
    value: '',
    rules: [
      (value) => (value ? null : 'Email is required'),
      (value) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) ? null : 'Enter a valid email'),
    ],
    error: null,
    touched: false,
  },
  phoneNumber: {
    value: '',
    rules: [(value) => (value ? null : 'Phone number is required')],
    error: null,
    touched: false,
  },
  state: {
    value: '',
    rules: [(value) => (value ? null : 'State is required')],
    error: null,
    touched: false,
  },
  description: {
    value: '',
    rules: [(value) => (value ? null : 'Description is required')],
    error: null,
    touched: false,
  },
})
const isUserActive = ref(false)
const states = [
  {
    id: useId(),
    name: 'Lagos',
  },
  {
    id: useId(),
    name: 'Ogun',
  },
  {
    id: useId(),
    name: 'Oyo',
  },
  {
    id: useId(),
    name: 'Abia',
  },
  {
    id: useId(),
    name: 'Imo',
  },
]
const loading = ref(false)

watch(
  () => user,
  (val) => {
    if (val) {
      fields.firstname.value = user?.firstName as string
      fields.lastname.value = user?.lastName as string
      fields.email.value = user?.email as string
      fields.phoneNumber.value = user?.phoneNumber as string
      fields.state.value = user?.state as string
      isUserActive.value = user?.status === 'active' ? true : false
      fields.description.value = user?.description as string
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const onSubmit = () => {
  loading.value = true
  const body = {
    id: Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(),
    firstName: fields.firstname.value as string,
    lastName: fields.lastname.value as string,
    email: fields.email.value as string,
    phoneNumber: fields.phoneNumber.value as string,
    state: fields.state.value as string,
    status: isUserActive.value ? 'active' : 'inactive',
    description: fields.description.value as string,
  }

  setTimeout(() => {
    Object.keys(fields).forEach((fieldName) => validateField(fieldName))
    if (isFormValid.value) {
      if (isEditing) {
        const foundIndex = users.value.findIndex((u) => u.id === user?.id)
        users.value[foundIndex] = body
      } else {
        users.value.unshift(body)
      }
      localStorage.setItem('users', JSON.stringify(users.value))
      userStore.fetchUsers()
      resetForm()
      closeModal()
      loading.value = false
    }
  }, 500)
}

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
