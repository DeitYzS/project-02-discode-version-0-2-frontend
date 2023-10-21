<template>
  <input
    class="text-field pl-4"
    placeholder="label"
    :value="modelValue"
    @input="updateValue($event)"
    v-bind="$attrs"
  />
</template>


<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    require: false,
    default: ''
  }
})

function updateValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement)?.value)
}
</script>

<style scoped>
.text-field {
  max-width: 80%;
  background-color: rgba(0, 0, 0, 0.10);
}
</style>
