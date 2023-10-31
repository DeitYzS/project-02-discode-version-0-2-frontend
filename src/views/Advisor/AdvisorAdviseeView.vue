<script setup lang="ts">
import type { StudentItem } from '@/type'
import StudentCard from '@/components/StudentCard.vue'
import { ref, type Ref, computed } from 'vue'
import StudentService from '@/services/StudentService'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import TextField from '@/components/TextField.vue'
const router = useRouter()
const keyword = ref('')
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'

const students: Ref<Array<StudentItem>> = ref([])

const totalEvent = ref<number>(0)
const advisorStore = useAdvisorStore()
const advisor = storeToRefs(advisorStore).advisor
const advisorID = advisor.value?.id
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})
const limit = 100

StudentService.getStudent(limit, props.page)
  .then((res: AxiosResponse<StudentItem[]>) => {
    students.value = res.data
    totalEvent.value = res.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  let queryFunction
  if (keyword.value === null || keyword.value === '') {
    queryFunction = StudentService.getStudent(5, toPage)
  } else {
    queryFunction = StudentService.getStudentByKeyword(keyword.value, 5, toPage)
  }
  queryFunction.then((res: AxiosResponse<StudentItem[]>) => {
    students.value = res.data
    totalEvent.value = res.headers['x-total-count']
    next()
  })
})

function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = StudentService.getStudent(limit, 1)
  } else {
    queryFunction = StudentService.getStudentByKeyword(keyword.value, limit, 1)
  }
  queryFunction
    .then((response: AxiosResponse<StudentItem[]>) => {
      students.value = response.data
      console.log('students', students.value)
      totalEvent.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvent.value)
    })
    .catch(() => {
      router.push({ name: 'network-errorr' })
    })
}
const adviseeStudents = computed(() => {
  return students.value.filter((student) => student.advisor.id === advisorID)
})
</script>
<template>
  <!-- Stage -->
  <main class="w-full h-full mt-8">
    <div class="h-1/6 VStack w-full justify-center items-center align-middle">
      <div class="w-full justify-center HStack items-center align-middle">
        <TextField
          v-model="keyword"
          type="text"
          @input="updateKeyword"
          class="w-full"
          placeholder="Search"
          label="Search"
        />
      </div>
    </div>

    <div class="w-full h-5/6 HStack">
      <div class="VStack w-full justify-center items-center align-middle p-4">
        <StudentCard
          v-for="student in adviseeStudents"
          :student="student"
          :key="student.id"
        ></StudentCard>
      </div>
    </div>
  </main>
</template>
