<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student?.id } }">
    <div class="HStack text-center items-center align-middle justify-center m-5 w-72 md:w-96 md:card">
      <img
        :src="student.image"
        alt="#student"
        class="h-16 w-16 object-cover mr-2 rounded-l border-gray-600 border-2 hover:border-gray-300 hidden md:block"
      />
      <div class="flex flex-col justify-center items-center align-middle text-center w-5/6">
        <span>{{ student.name }} {{ student.surname }}</span>
        <h4 class="hidden md:block">{{ student.id }}</h4>
      </div>
      <div class="p-4">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
      </div>
      
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    required: true
  }
})
</script>

<style scoped>
.card {
  width: 450px;
  height: 50px;
}
</style>
