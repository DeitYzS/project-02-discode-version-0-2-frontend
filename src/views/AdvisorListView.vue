<script setup lang="ts">
import type { AdvisorItem } from '@/type'
import { ref, type Ref, computed } from 'vue'
import AdvisorService from '@/services/AdvisorService'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import AdvisorCard from '@/components/AdvisorCard.vue'
import TextField from '@/components/TextField.vue'
const router = useRouter()
const advisors: Ref<Array<AdvisorItem>> = ref([])
const totalAdvisor = ref<number>(0)
const keyword = ref('')
const totalEvent = ref<number>(0)

const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

AdvisorService.getAdvisor(3, props.page)
  .then((res: AxiosResponse<AdvisorItem[]>) => {
    advisors.value = res.data
    totalAdvisor.value = res.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  AdvisorService.getAdvisor(3, toPage)
    .then((res: AxiosResponse<AdvisorItem[]>) => {
      advisors.value = res.data
      totalAdvisor.value = res.headers['x-total-count']
      next()
    })
    .catch(() => {
      next({ name: 'network-error' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAdvisor.value / 3)
  return props.page.valueOf() < totalPages
})
function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = AdvisorService.getAdvisor(3, 1)
  } else {
    queryFunction = AdvisorService.getAdvisorByKeyword(keyword.value, 5, 1)
  }
  queryFunction
    .then((response: AxiosResponse<AdvisorItem[]>) => {
      advisors.value = response.data
      console.log('students', advisors.value)
      totalEvent.value = response.headers['x-total-count']
      console.log('totalEvent', totalEvent.value)
    })
    .catch(() => {
      router.push({ name: 'network-errorr' })
    })
}
</script>

<template class="bg-black">
  <main class="w-full h-full">
    <div class="h-auto VStack w-full justify-center items-center align-middle">
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
      <div class="VStack w-1/3 text-left align-middle justify-center">
        <RouterLink
          :to="{ name: 'advisor-list', query: { page: page - 1 } }"
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
          <AdvisorCard
            v-for="advisor in advisors"
            :advisor="advisor"
            :key="advisor.id"
          ></AdvisorCard>
        </div>
      </div>

      <div class="VStack w-1/3 text-right items-end align-middle justify-center">
        <RouterLink
          :to="{ name: 'advisor-list', query: { page: page + 1 } }"
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
