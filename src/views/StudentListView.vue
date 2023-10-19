<template class="bg-black">
  <h1 class="flex flex-col items-center font-bold">STUDENTLIST</h1>
  <main class="flex flex-col items-center">
    <StudentCard v-for="student in students" :student="student" :key="student.id"></StudentCard>

    <div class="pagination font-bold mt-5">
      <RouterLink
        :to="{ name: 'student-list', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="hover:text-green-500 m-10"
      >
        Prev page
      </RouterLink>

      <RouterLink
        :to="{ name: 'student-list', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        id="page-next"
        class="hover:text-green-500 m-10"
      >
        Next page
      </RouterLink>
    </div>
  </main>
</template>

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
