<script lang="ts" setup>
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useAdvisorStore } from '@/stores/advisor'
import { ref } from 'vue'

const advisorStore = useAdvisorStore()
const store = useStudentStore()
const {student} = storeToRefs(store)
const advisor = storeToRefs(advisorStore).advisor
const id = ref(student.value?.id)



</script>
<template>
  <main class="container mx-auto px-4">
    <div class="VStack h-screen">
      <div class="VStack md:HStack md:safe-area">
        <div  v-if="student" class="VStack safe-area md:w-1/2">
          <p class="text-2xl font-secondary">Stident</p>
          <p class="font-bold text-lg">{{id}}</p>
          <h1 class="text-left text-5xl font-medium black font-primary">
            {{ student.name }} {{ student.surname }} <br />
            <span class="text-left text-lg font-light font-sans">
              Advisor: {{advisor?.name}} <br />
              <!-- beyond the SE311 LAB. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident asperiores fugit repellendus fugiat iure odit quae blanditiis error. Sed eum nihil odio omnis sunt perspiciatis dolorem, eligendi culpa consequatur. -->
            </span>
          </h1>
        </div>
        <div  v-if="student" class="HStack md:w-1/2 md:justify-end">
          <img :src="student.image" class="profile rounded-lg" alt="User Image" />
        </div>
      </div>

      <div class="herizontal-line"></div>

      <div class="HStack flex items-center justify-center">
    <div class="VStack w-1/2 flex items-center justify-center">
        <p class="text-xl">Detail</p>
    </div>
    <div class="vertical-line"></div>
    <div class="VStack w-1/2 flex items-center justify-center">
        <p class="text-xl">Comments</p>
    </div>
</div>

    </div>
  </main>
</template>

<style scoped>
.safe-area {
  padding-top: 500px;
}
.profile {
  min-width: 350px;
  height: auto;
  background-size: contain;
}
</style>
