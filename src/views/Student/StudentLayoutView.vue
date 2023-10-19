<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue' 
import { useAdvisorStore } from '@/stores/advisor'

const advisorStore = useAdvisorStore()
const store = useStudentStore()
const {student} = storeToRefs(store)
const advisor = storeToRefs(advisorStore).advisor
const id = ref(student.value?.id)

const addComment = (event: any) => {
  console.log(event);
  student.value?.comments.unshift(event)
}

watchEffect(() => {
  console.log(student.value)
})


</script>
<template>
  <div class="flex m-16 space-x-4" v-if="student">
    <!-- 1st Column -->
    <div class="VStack min-w-fit w-60 max-h-fit bg-white rounded-lg shadow-sm">
      <div v-if="student" class="text-left font-normal p-5">
        <div class="flex justify-center mb-4">
          <img :src="student.image" alt="" class="rounded-full w-28 h-28 object-cover" />
        </div>

        <h1 class="font-semibold text-lg">{{ student.name }} {{ student.surname }}</h1>
        <p>#{{ student.id }}</p>
        <div class="m-4"></div>
        <ul>
          <li v-for="course in student.course_list" :key="course">{{ course }}</li>
        </ul>
        <RouterView :student="student"></RouterView>
      </div>
    </div>
    <!-- 2nd Column -->
    <div class="flex-1">
      <div class="text-left text-lg font-semibold">Comments</div>
      <div class="flex mt-2 space-x-4">
        <div class="flex-1 space-y-4" v-if="student">
          <CommentForm @add-comment="addComment" :newId="student?.comments.length"/>
          <CommentList :comments="student.comments" :advisor="advisor" v-if="student && advisor"/> 
        </div>
        <div class="VStack min-w-fit w-48 max-h-fit bg-white rounded-lg shadow-sm">
          <div v-if="student" class="text-left font-normal p-5">
            <h1 class="font-semibold text-center mb-4">Advisor</h1>

            <div v-if="advisor">
            <div class="flex justify-center mb-4">
              <img :src="advisor.image" alt="" class="rounded-full w-28 h-28 object-cover" />
            </div>


              <h1 class="font-semibold text-lg">{{ advisor?.name }} {{ advisor.surname }}</h1>
              <p>#{{ advisor.id }}</p>
              
            </div>
            <RouterView :student="student"></RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
