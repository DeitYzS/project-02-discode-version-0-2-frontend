<template>
  <!-- <input
    class="text-field pl-4"
    placeholder="label"
    :value="modelValue"
    @input="updateValue($event)"
    v-bind="$attrs"
  /> -->

  <input
    class="text-field pl-4 text-white"
    :type="type"
    :id="uuid"
    :class="placeholderErrorClass"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
    v-bind="$attrs"
    :aria-describedby="error ? `${uuid}-error` : undefined"
    :aria-invalid="error ? true : false"
  />
  <ErrorMessage class="inline-flex text-sm text-red-700" v-if="error" :id="`${uuid}-error`">
    {{ error }}
    <svg xmlns="http://www.w3.org/200/svg" class="w-6 h-6" fill="none" stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 M6M 6112 12"
      />
    </svg>
  </ErrorMessage>
</template>

<script setup lang="ts">
import UniqueID from '@/features/UniqueID'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { computed } from 'vue'

export interface Props {
  placeholder?: string
  modelValue?: any
  error?: string
  required?: boolean
  type: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  modelValue: '',
  error: '',
  required: false,
  type: 'text'
})

const uuid = UniqueID().getID()
const placeholderErrorClass = computed(() => {
  return !isError.value
    ? 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 '
    : 'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
})

const isError = computed(() => {
  return props.error ? true : false
})
</script>

<style scoped>
.text-field {
  max-width: 80%;
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
