<template>
  

    <RouterLink :to="{name: 'student-detail',params:{id: student?.id}}">
      <div class="card text-center m-5">
      <div class="border-solid border-2 border-gray-700 p-2 rounded-md m-2 hover:border-gray-300 hover:text-gray-400 flex flex-row">
        <img :src="student.image" alt="#student" class="h-16 w-16 object-cover mr-2 rounded-l border-gray-600 border-2 hover:border-gray-300">
        <div class="flex flex-col justify-center items-center w-5/6">
          <span>Name: {{ student.name }}  {{ student.surname }}</span>
          <h4>StudentID: {{ student.id }}</h4>
        </div>
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