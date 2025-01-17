<template>
  <div class="relative">
    <UiLabel :label="label" />
    <input
      :id="name"
      v-bind="$attrs"
      ref="inputRef"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="form-input-field"
      :class="[classes, { 'focus:ring-red-500': errorMessage, 'pr-12': type === 'password' }]"
      :inputmode="mode"
      :disabled="disabled"
      @input="updateValue($event)"
    />
    <UiFormError v-show="errorMessage" :message="errorMessage" />
  </div>
</template>

<script setup lang="ts">
import UiLabel from './UiLabel.vue'
import UiFormError from './UiFormError.vue'

type INPUT_TYPE = 'url' | 'text' | 'password' | 'tel' | 'number' | 'email' | 'search'

type INPUT_MODE = 'url' | 'text' | 'decimal' | 'tel' | 'numeric' | 'email' | 'none' | 'search'

withDefaults(
  defineProps<{
    type?: INPUT_TYPE
    mode?: INPUT_MODE
    name: string
    label?: string
    placeholder?: string
    errorMessage?: string | null
    disabled?: boolean
    classes?: string
  }>(),
  {
    type: 'text',
    mode: 'text',
    placeholder: '',
    label: '',
    errorMessage: '',
    disabled: false,
    classes: '',
  },
)

const modelValue = defineModel<string | number>()

function updateValue(e: Event) {
  modelValue.value = (e.target as HTMLInputElement).value
}
</script>
