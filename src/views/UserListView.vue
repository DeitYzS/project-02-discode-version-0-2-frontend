<template class="bg-black">
  <main class="flex flex-col items-center text-white mt-14">
    <div class="relative window">
      <!-- Other content here -->
      <!-- <StudentCard v-for="student in students" :student="student" :key="student.id"></StudentCard> -->
      <!-- Display child components within the layout -->
      <div class="HStack h-10 w-full mt-8 mb-8">
        <div class="w-1/3 flex items-center justify-start align-middle">
          <RouterLink
            v-if="$route.name !== 'student-list' && $route.name !== 'advisor-list'"
            class="hover:text-green-500 m-10 button-circle"
            :to="{ name: 'student-list' }"
            ><svg
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
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </RouterLink>
        </div>
        <div class="w-1/3 flex items-center justify-center align-middle">
          <p class="text-xl font-medium mt-4 p-4">{{ routeText }}</p>
        </div>
        <div class="w-1/3 flex items-center justify-end align-middle">
          <RouterLink
            v-if="$route.name !== 'add-student' && $route.name !== 'add-advisor'"
            class="hover:text-green-500 m-10 button-circle"
            :to="{ name: $route.name === 'student-list' ? 'add-student' : 'add-advisor' }"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" /></svg
          ></RouterLink>

          <button
            type="submit"
            v-if="$route.name !== 'student-list' && $route.name !== 'advisor-list'"
            class="hover:text-green-500 m-10 secondary-button"
            :to="{ name: $route.name === 'student-list' ? 'add-student' : 'add-advisor' }"
          >
            Done
          </button>
        </div>
      </div>
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

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Define a computed property to set the text based on the route name
const routeText = computed(() => {
  if (route.name === 'student-list') {
    return 'Students'
  } else if (route.name === 'advisor-list') {
    return 'Advisors'
  } else if (route.name === 'add-student') {
    return 'Add student'
  } else if (route.name === 'add-advisor') {
    return 'Add advisor'
  } else {
    return 'Something went wrong'
  }
})
</script>
