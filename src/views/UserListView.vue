<template class="bg-black">
  <main class="flex flex-col items-center text-white mt-14">
    <div class="relative window">
      <!-- Other content here -->
      <!-- <StudentCard v-for="student in students" :student="student" :key="student.id"></StudentCard> -->
      <!-- Display child components within the layout -->
      <router-view></router-view>
      <div class="toolbar">
        <div class="HStack w-full h-full">
          <div class="w-1/2 flex items-center justify-center">
            <RouterLink class="hover:text-red-400" :to="{ name: 'student-list' }"
              >Student</RouterLink
            >
          </div>

          <div class="w-1/2 flex items-center justify-center">
            <RouterLink class="hover:text-red-400" :to="{ name: 'advisor-list' }"
              >Advisor</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style>


@media only screen and (max-width: 600px) {

}
</style>

<script setup lang="ts">
// import type { StudentItem } from '@/type'
// import StudentCard from '@/components/StudentCard.vue'
// import { ref, type Ref, computed } from 'vue'
// import StudentService from '@/services/StudentService'
// import type { AxiosResponse } from 'axios'
// import { useRouter } from 'vue-router'
// import { onBeforeRouteUpdate } from 'vue-router'

// const router = useRouter()
// const students: Ref<Array<StudentItem>> = ref([])
// const totalEvent = ref<number>(0)
// const props = defineProps({
//   page: {
//     type: Number,
//     required: true
//   }
// })

// StudentService.getStudent(5, props.page)
//   .then((res: AxiosResponse<StudentItem[]>) => {
//     students.value = res.data
//     totalEvent.value = res.headers['x-total-count']
//   })
//   .catch(() => {
//     router.push({ name: 'network-error' })
//   })

// onBeforeRouteUpdate((to, from, next) => {
//   const toPage = Number(to.query.page)
//   StudentService.getStudent(5, toPage)
//     .then((res: AxiosResponse<StudentItem[]>) => {
//       students.value = res.data
//       totalEvent.value = res.headers['x-total-count']
//       next()
//     })
//     .catch(() => {
//       next({ name: 'network-error' })
//     })
// })

// const hasNextPage = computed(() => {
//   const totalPages = Math.ceil(totalEvent.value / 5)
//   return props.page.valueOf() < totalPages
// })
</script>
