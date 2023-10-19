<template>
  <RouterLink :to="{name: 'advisor-detail',params:{id: advisor?.id}}">
    <div class="card text-center w-5/5 m-5">
      <div class="border-solid border-2 border-gray-700 p-2 rounded-md m-2 hover:border-red-300 hover:text-red-300">
        <span>ID: {{advisor.id}} </span><br/>
        <span>{{ advisor.name }}  {{ advisor.surname }}</span>
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
  