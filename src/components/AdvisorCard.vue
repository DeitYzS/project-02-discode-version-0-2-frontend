<template>
  <RouterLink :to="{ name: 'advisor-detail', params: { id: advisor?.id } }">
    <div
      class="HStack text-center items-center align-middle justify-center m-5 w-72 md:w-96 md:card"
    >
      <img
        :src="advisor.images[0]"
        alt="#student"
        class="h-16 w-16 object-cover mr-2 rounded-l border-gray-600 border-2 hover:border-gray-300 hidden md:block"
      />
      <div class="flex flex-col justify-center items-center align-middle text-center w-5/6">
        <span>{{ advisor.name }} {{ advisor.surname }}</span>
      </div>
      <div class="HStack gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
        <p>{{advisor.studentList.length}}</p>
      </div>
      <div class="p-4">
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
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import type { AdvisorItem } from '@/type'
import type { PropType } from 'vue'

defineProps({
  advisor: {
    type: Object as PropType<AdvisorItem>,
    required: true
  }
})
</script>

<style scoped>
.card {
  width: 300px;
  height: 50px;
}
</style>
