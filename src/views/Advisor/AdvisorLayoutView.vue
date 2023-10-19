<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { useStudentStore } from '@/stores/student'
import DataAdvisorService from '@/services/DataAdvisorService'
import type { AdvisorItem, StudentItem } from '@/type'
import type { Ref } from 'vue'
import type { AxiosResponse } from 'axios'

const students: Ref<Array<StudentItem>> = ref([])
const advisorStore = useAdvisorStore()
const store = useStudentStore()
const student = storeToRefs(store).student
const advisors = storeToRefs(advisorStore).advisor


// const id: number = student.value?.advisorId

// DataAdvisorService.getStudentOfById(id)
//     .then((res: AxiosResponse<StudentItem[]>) => {
//       if (student.value?.advisorId == advisors.value?.id) {
//         students.value = res.data
//       }
      
//     })

</script>

<template>
  <div class=" flex flex-col area">
    <div v-if="advisors" class="flex flex-col items-center  h-4/5 text-2xl rounded-2xl">
      <div class="m-5 ">
        <img :src="advisors.image" alt="#" class=" rounded-full w-32 h-32 border-2 border-gray-500 object-cover" >
      </div>
        {{ advisors.name }} {{ advisors.surname }}
    </div>
    
    <div id="contract" class="gmail-area flex flex-row justify-center items-center font-bold">
        <img src="../../assets/gmail.png" alt="#gmail" class="gmail mr-4">
        <span> {{ advisors?.email }}</span>
    </div>
  
    <!-- <div v-if="student?.advisorId == advisors?.id">
      <StudentCard v-for="student in students" :student="student" :key="student.id"></StudentCard>
    </div> -->
    <RouterView :student="student"></RouterView>
  </div>
</template>

<style scoped>
  .area{
    width: 75%;
    height: 500px;
    background: rgba(0, 0, 0, 0.3);
    position: relative;
    margin: auto;
    border-radius: 5px;
    margin-top: 5rem;
  }
  .gmail {
    width: 50px;
    height: 50px;
    object-fit: cover;
    
  }

  .gmail-area {
    width: fit-content;
    height: fit-content;
    position: relative;
    top: -35%;
    margin-left: 10%;
    background-color: rgba(0, 0, 0, 0.25);
    padding: 1rem;
    border-radius: 10px;
  }
</style>