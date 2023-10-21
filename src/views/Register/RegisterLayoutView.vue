<template>
  <div class="flex justify-center h-screen">
    <div class="VStack items-center">
      <div class="w-1/2 text-center space-y-4">
        <p class="text-3xl font-semibold">Registration</p>
        <p>
          We are excited to extend an invitation to you for the upcoming [Event Name] – a platform
          that unites students and advisors in a dynamic academic environment. This event aims to
          foster collaboration, learning, and growth, and we are eager to have you be a part of it.
        </p>
      </div>
      <div class="text-center mt-8">
        <div id="nav" class="HStack text-lg font-medium space-x-4">
          <RouterLink class="hover:text-red-400" :to="{ name: 'student-register' }"
            >Student</RouterLink
          >
          <div>|</div>
          <RouterLink class="hover:text-red-400" :to="{ name: 'advisor-register' }"
            >Advisor</RouterLink
          >
        </div>
      </div>

      <!-- Display child components within the layout -->
      <router-view></router-view>

      <div id="flashMessage" class="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'

const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<style scoped>
#flashMessage {
  animation: yellowfade 3s ease-in-out;
}

.flashMessage {
  /* Define your styles for the flash message here */
  color: blue;
}

</style>
@/stores/message