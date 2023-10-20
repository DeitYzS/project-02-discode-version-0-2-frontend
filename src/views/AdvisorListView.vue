<script setup lang="ts">
import type { AdvisorItem } from '@/type'
import { ref, type Ref, computed } from 'vue'
import AdvisorService from '@/services/AdvisorService'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import AdvisorCard from '@/components/AdvisorCard.vue'

const router = useRouter()
const advisors: Ref<Array<AdvisorItem>> = ref([])
const totalAdvisor = ref<number>(0)
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
    router.push({ name: 'NetworkError' })
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
      next({ name: 'NetworkError' })
    })
})

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalAdvisor.value / 3)
  return props.page.valueOf() < totalPages
})
</script>

<template class="bg-black">
  <main>
    <div class="HStack items-center">
      <AdvisorCard v-for="advisor in advisors" :advisor="advisor" :key="advisor.id"></AdvisorCard>
    </div>

    <!-- <div class="pagination font-bold ">
    <RouterLink :to="{ name: 'advisor-list', query: {page: page-1}}" rel="prev" v-if="page != 1" id="page-prev " class=" mr-6 hover:text-green-500">
      Prev page
    </RouterLink>

    <RouterLink :to="{ name: 'advisor-list', query: {page: page+1}}" rel="next" v-if="hasNextPage" id="page-next" class=" ml-6 hover:text-green-500">
      Next page
    </RouterLink>
  </div> -->
  </main>
</template>
