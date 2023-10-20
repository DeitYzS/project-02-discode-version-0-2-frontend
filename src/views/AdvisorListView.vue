<script setup lang="ts">
import type { AdvisorItem } from '@/type'
import AdvisorCard from '@/components/AdvisorCard.vue'
import { ref, type Ref, computed } from 'vue'
import AdvisorService from '@/services/AdvisorService'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'

const router = useRouter()
const advisors: Ref<Array<AdvisorItem>> = ref([])
const totalEvent = ref<number>(0)
const props = defineProps({
  page: {
    type: Number,
    required: true
  }
})

AdvisorService.getAdvisor(5, props.page)
  .then((res: AxiosResponse<AdvisorItem[]>) => {
    advisors.value = res.data
    totalEvent.value = res.headers['x-total-count']
  })
  .catch(() => {
    router.push({ name: 'NetworkError' })
  })

onBeforeRouteUpdate((to, from, next) => {
  const toPage = Number(to.query.page)
  AdvisorService.getAdvisor(5, toPage)
    .then((res: AxiosResponse<AdvisorItem[]>) => {
      advisors.value = res.data
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
  <AdvisorCard v-for="advisor in advisors" :advisor="advisor" :key="advisor.id"></AdvisorCard>

  <!-- <div class="pagination font-bold mt-5">
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
  </div> -->
</template>

<style scoped>
.ocean-blue {
  background-color: #1b9ff4;
  color: white;
  min-width: 120px;
}
</style>
