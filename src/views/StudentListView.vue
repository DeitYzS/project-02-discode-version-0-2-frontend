<script setup lang="ts">
import type { StudentItem } from '@/type'
import StudentCard from '@/components/StudentCard.vue'
import { ref, type Ref, computed } from 'vue'
import StudentService from '@/services/StudentService'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

const router = useRouter()
const students: Ref<Array<StudentItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

StudentService.getStudent(5, props.page)
  .then((res: AxiosResponse<StudentItem[]>) => {
    students.value = res.data
    totalEvent.value = res.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'NetworkError' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  StudentService.getStudent(5, toPage)
    .then((res: AxiosResponse<StudentItem[]>) => {
      students.value = res.data
      totalEvent.value = res.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'NetworkError' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / 5)
  return props.page.valueOf() < totalPages
})
</script>
<template>
  <main class="w-full h-full">
    <div class="w-full h-full HStack">
      <div class="VStack w-1/3 text-left align-middle justify-center">
        <RouterLink
          :to="{ name: 'student-list', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          id="page-prev"
          class="hover:text-green-500 m-10 button-circle mr-96"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </RouterLink>
      </div>
      <div class="w-1/3 flex items-center justify-center">
        <div class="VStack items-center justify-center">
          <StudentCard
            v-for="student in students"
            :student="student"
            :key="student.id"
          ></StudentCard>
        </div>
      </div>

      <div class="VStack w-1/3 text-right items-end align-middle justify-center">
        <RouterLink
          :to="{ name: 'student-list', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          id="page-next"
          class="hover:text-green-500 m-10 button-circle"
        >
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
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.ocean-blue {
  background-color: #1b9ff4;
  color: white;
  min-width: 120px;
}


</style>
