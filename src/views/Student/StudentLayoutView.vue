<script lang="ts" setup>
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useAdvisorStore } from '@/stores/advisor'
import { ref } from 'vue'
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
const editMode = ref(false)

const advisorStore = useAdvisorStore()
const store = useStudentStore()
const { student } = storeToRefs(store)
const advisor = storeToRefs(advisorStore).advisor
const id = ref(student.value?.id)


const toggleEditMode = () => {
  editMode.value = !editMode.value
}

defineProps({
  students: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
</script>

<template>
  <main class="container mx-auto px-4">
    <div class="VStack h-screen">
      <div class="h-auto w-full">
        <div class="HStack justify-between">
          <div class="VStack justify-center">
            <RouterLink :to="{ name: 'student-list' }" class="hover:text-green-500 button-circle">
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
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </RouterLink>
          </div>
          <div class="VStack justify-center">
            <button
          type="submit"
          class="hover:text-green-500 m-10 secondary-button"
          :class="{ shaking: editMode }"
          @click="toggleEditMode"
        >
          {{ editMode ? 'Done' : 'Edit' }}
        </button>
          </div>
        </div>
      </div>
      <div class="VStack md:HStack md:safe-area">
        <div v-if="student" class="VStack safe-area md:w-1/2">
          <p class="text-2xl font-secondary">Student</p>
          <p class="font-bold text-lg editable" :class="{ shaking: editMode }">
            {{ student.studentId }}
          </p>
          <h1
            class="text-left text-5xl font-medium black font-primary editable"
            :class="{ shaking: editMode }"
          >
            {{ student.name }} {{ student.surname }} <br />
            <span class="text-left text-lg font-light font-sans">
              Advisor: {{ student?.advisor.name }} {{ student?.advisor.surname }}<br />
              <!-- beyond the SE311 LAB. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident asperiores fugit repellendus fugiat iure odit quae blanditiis error. Sed eum nihil odio omnis sunt perspiciatis dolorem, eligendi culpa consequatur. -->
            </span>
          </h1>
        </div>
        <div class="HStack md:w-1/2 md:justify-end">
          <div class="VStack md:justify-end">
            <img
              v-for="image in students?.images[0]"
              :key="image"
              :src="image"
              alt="student image"
              class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg editable"
              :class="{ shaking: editMode }"
            />
          </div>
        </div>
      </div>

      <div class="herizontal-line"></div>

      <div class="HStack flex items-center justify-center">
        <div class="VStack w-1/2 flex items-center justify-center">
          <RouterLink class="hover:text-red-400" :to="{ name: 'student-detail' }"
            ><p class="text-xl">Detail</p>
          </RouterLink>
        </div>
        <div class="vertical-line"></div>
        <div class="VStack w-1/2 flex items-center justify-center">
          <RouterLink class="hover:text-red-400" :to="{ name: 'student-comment' }">
            <p class="text-xl">Comments</p>
          </RouterLink>
        </div>
      </div>
      <!-- Display child components within the layout -->
      <router-view></router-view>
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
button {
  margin: 0;
}



.editable.shaking {
  animation: jiggle 0.2s infinite;
  -webkit-animation: jiggle 0.2s infinite;
  -moz-animation: jiggle 0.2s infinite;
  -moz-animation-duration: 0.2s;
  animation-duration: 0.2s;
  -webkit-transform: rotate(-1deg);
  -moz-transform: rotate(-1deg);
}
@keyframes jiggle {
    0% {
        transform: rotate(-1deg);
	}
	50% {
    	transform: rotate(1deg);
	}
}

@-webkit-keyframes jiggle {
    0% {
        -webkit-transform: rotate(-1deg);
	}
	50% {
    	-webkit-transform: rotate(1deg);
	}
}

@-moz-keyframes jiggle {
    0% {
        -moz-transform: rotate(-1deg);
	}
	50% {
		-moz-transform: rotate(1deg);
	}
}
</style>
