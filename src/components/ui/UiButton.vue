<template>
  <button
    :variant="variant"
    :size="size"
    :class="{
      'min-h-[46px] py-2': size === 'default',
      'min-h-[36px] py-1': size === 'sm',
      'min-h-[50px] py-2': size === 'lg',
      'bg-primary text-white hover:bg-primary-dark active:bg-primary-dark':
        variant === 'primary',
      'border border-primary text-primary hover:bg-primary hover:text-white':
        variant === 'outline',
      'bg-transparent text-primary hover:bg-primary/10': variant === 'ghost',
      'bg-red-500 text-white': variant === 'destructive',
      'bg-transparent px-2': variant === 'icon',
      'rounded-md': rounded,
      'rounded-full': roundedFull,
      'w-full': full,
      'shadow-btn': raised,
      'flex items-center justify-center': loading,
      'mx-auto': center,
    }"
    :type="type"
    :disabled="disabled"
    class="block px-6 text-base font-semibold capitalize tracking-wide transition duration-300 ease-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
    v-bind="$attrs"
  >
    <slot></slot>
    <div
      v-if="loading"
      :class="[
        variant === 'primary'
          ? 'size-5 animate-spin rounded-full border-2 border-solid border-white border-t-transparent'
          : 'size-5 animate-spin rounded-full border-2 border-solid border-primary border-t-transparent',
      ]"
    />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'outline' | 'destructive' | 'ghost' | 'icon'
type ButtonSize = 'default' | 'sm' | 'lg'
type ButtonType = 'button' | 'submit'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    type?: ButtonType
    disabled?: boolean
    loading?: boolean
    full?: boolean
    rounded?: boolean
    roundedFull?: boolean
    raised?: boolean
    center?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'default',
    type: 'button',
    disabled: false,
    loading: false,
    full: false,
    rounded: false,
    roundedFull: false,
    raised: false,
    center: false,
  },
)
</script>
