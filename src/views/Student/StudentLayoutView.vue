<script lang="ts" setup>
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useAdvisorStore } from '@/stores/advisor'
import { ref } from 'vue'
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'

const advisorStore = useAdvisorStore()
const store = useStudentStore()
const { student } = storeToRefs(store)
const advisor = storeToRefs(advisorStore).advisor
const id = ref(student.value?.id)

defineProps({
  students: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
</script>

<template>
  <main class="container mx-auto px-4">
    <div class="VStack h-screen">
      <div class="VStack md:HStack md:safe-area">
        <div v-if="student" class="VStack safe-area md:w-1/2">
          <p class="text-2xl font-secondary">Stident</p>
          <p class="font-bold text-lg">{{ id }}</p>
          <h1 class="text-left text-5xl font-medium black font-primary">
            {{ student.name }} {{ student.surname }} <br />
            <span class="text-left text-lg font-light font-sans">
              Advisor: {{ student?.advisor.name }} {{student?.advisor.surname}}<br />
              <!-- beyond the SE311 LAB. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident asperiores fugit repellendus fugiat iure odit quae blanditiis error. Sed eum nihil odio omnis sunt perspiciatis dolorem, eligendi culpa consequatur. -->
            </span>
          </h1>
        </div>
        <div class="HStack md:w-1/2 md:justify-end">
          <div class="VStack md:justify-end">
            <img
              v-for="image in students?.images[0]"
              :key="image"
              :src="image"
              alt="student image"
              class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
            />
          </div>
        </div>
      </div>

      <div class="herizontal-line"></div>

      <div class="HStack flex items-center justify-center">
        <div class="VStack w-1/2 flex items-center justify-center">
          <RouterLink class="hover:text-red-400" :to="{ name: 'student-detail' }"
            ><p class="text-xl">Detail</p>
          </RouterLink>
        </div>
        <div class="vertical-line"></div>
        <div class="VStack w-1/2 flex items-center justify-center">
          <RouterLink class="hover:text-red-400" :to="{ name: 'student-comment' }">
            <p class="text-xl">Comments</p>
          </RouterLink>
        </div>
      </div>
      <!-- Display child components within the layout -->
      <router-view></router-view>
    </div>
  </main>
</template>

<style scoped>
.safe-area {
  padding-top: 500px;
}
.profile {
  width: auto;
  height: 300px;
  background-size: contain;
}
</style>
