<script lang="ts" setup>
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { AdvisorItem } from '@/type'
import type { PropType } from 'vue'

const advisorStore = useAdvisorStore()
const advisor = storeToRefs(advisorStore).advisor


defineProps({
  advisors: {
    type: Object as PropType<AdvisorItem>,
    require: true
  }
})
</script>

<template>
  <main class="container mx-auto px-4">
    <div class="VStack h-screen">
      <div class="VStack md:HStack md:safe-area">
        <div v-if="advisor" class="VStack safe-area md:w-1/2">
          <p class="text-2xl font-secondary">Advisor</p>
          <!-- <p class="font-bold text-lg">{{ id }}</p> -->
          <h1 class="text-left text-5xl font-medium black font-primary">
            {{ advisor.name }} {{ advisor.surname }} <br />
            <span class="text-left text-lg font-light font-sans">
              Email: {{ advisor.email }} <br />
              <!-- beyond the SE311 LAB. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident asperiores fugit repellendus fugiat iure odit quae blanditiis error. Sed eum nihil odio omnis sunt perspiciatis dolorem, eligendi culpa consequatur. -->
            </span>
          </h1>
        </div>
        <div class="HStack md:w-1/2 md:justify-end">
          <div class="VStack md:justify-end">
            <img
              v-for="image in advisor?.images"
              :key="image"
              :src="image"
              alt="student image"
              class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
            />
          </div>
        </div>
      </div>

      <div class="herizontal-line"></div>

      <section class="window-ignore p-4">
        <div class="HStack flex items-center justify-center w-full">
          <div class="VStack w-1/2 flex items-center justify-center">
            <RouterLink class="hover:text-red-400" :to="{ name: 'advisor-detail' }"
              ><p class="text-xl">Detail</p>
            </RouterLink>
          </div>
          <div class="vertical-line"></div>
          <div class="VStack w-1/2 flex items-center justify-center">
            <RouterLink class="hover:text-red-400" :to="{ name: 'advisor-advisee' }">
              <p class="text-xl">Advisee</p>
            </RouterLink>
          </div>
        </div>

        <!-- Display child components within the layout -->
        <router-view></router-view>
      </section>
    </div>
  </main>
</template>

<style scoped>
.safe-area {
  padding-top: 300px;
}
.profile {
  width: auto;
  height: 300px;
  background-size: contain;
}
</style>
