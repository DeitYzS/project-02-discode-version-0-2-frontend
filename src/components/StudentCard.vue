<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student?.id } }">
    <div class="HStack text-center items-center align-middle justify-center m-5 w-72 md:card">
      <img
        :src="student.image"
        alt="#student"
        class="h-16 w-16 object-cover mr-2 rounded-l border-gray-600 border-2 hover:border-gray-300 hidden md:block"
      />
      <div class="flex flex-col justify-center items-center align-middle text-center w-5/6">
        <span>{{ student.name }} {{ student.surname }}</span>
        <h4>{{ student.id }}</h4>
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
