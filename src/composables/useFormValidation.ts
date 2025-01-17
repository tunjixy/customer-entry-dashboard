import { reactive, computed } from 'vue'

type ValidationRule = (value: string | number) => string | null

interface Field {
  value: string | number
  rules: ValidationRule[]
  error: string | null
  touched: boolean
}

export function useFormValidation(fieldsConfig: Record<string, Field>) {
  const fields = reactive(fieldsConfig)

  const validateField = (fieldName: string) => {
    const field = fields[fieldName]
    if (!field || !field.touched) return

    for (const rule of field.rules) {
      const error = rule(field.value)
      if (error) {
        field.error = error
        return
      }
    }
    field.error = null
  }

  const markFieldAsTouched = (fieldName: string) => {
    if (fields[fieldName]) {
      fields[fieldName].touched = true
    }
  }

  const resetForm = () => {
    Object.keys(fields).forEach((fieldName) => {
      fields[fieldName].value = ''
      fields[fieldName].error = null
      fields[fieldName].touched = false
    })
  }

  const isFormValid = computed(() => {
    return Object.values(fields).every((field) => !field.error && field.value !== '')
  })

  return {
    fields,
    validateField,
    markFieldAsTouched,
    resetForm,
    isFormValid,
  }
}
