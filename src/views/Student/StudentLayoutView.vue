<script lang="ts" setup>
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useAdvisorStore } from '@/stores/advisor'
import { ref } from 'vue'
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
import TextField from '@/components/TextField.vue'
import StudentService from '@/services/StudentService'
import Picker from '@/components/PickerField.vue'
import ImageUpload from '@/components/ImageUpload.vue'

import type { AdvisorItem } from '@/type'
const advisors = ref<AdvisorItem[]>([])
import AdvisorService from '@/services/AdvisorService'
const store = useStudentStore()
const { student } = storeToRefs(store)
const id = ref(student.value?.id)
const editingAdvisor = ref(false)
const editMode = ref(false)
const editingName = ref(false)
const editingLastname = ref(false)
const editingPicture = ref(false)

const toggleEditMode = () => {
  editMode.value = !editMode.value
  if (!editMode.value) {
    editingName.value = false
    editingLastname.value = false
    editingAdvisor.value = false
    editingPicture.value = false

    updateStudent()
  }
}

const updateStudent = async () => {
  if (student.value && id.value !== undefined) {
    const updatedProperties = {
      name: student.value.name,
      surname: student.value.surname,
      advisor: student.value.advisor
    }
    console.log('Updating student with', updatedProperties)

    StudentService.updateStudent(id.value, updatedProperties)
      .then((response) => {
        console.log('Student updated successfully', response.data)
      })
      .catch((error) => {
        console.error('Failed to update student', error)
      })
  }
}
AdvisorService.getAdvisorBy()
  .then((response: AxiosResponse<AdvisorItem[]>) => {
    advisors.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })
const editingStudentName = () => {
  editingName.value = true
  editMode.value = true
}

const editingStudentpicture = () => {
  editingPicture.value = true
  editMode.value = true
}

const editingStudentadvisor = () => {
  editingAdvisor.value = true
  editMode.value = true
}

const editingStudentLastname = () => {
  editingLastname.value = true
  editMode.value = true
}

defineProps({
  students: {
    type: Object as PropType<StudentItem>,
    required: true
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

          <h1 class="text-left text-5xl font-medium black font-primary">
            <div>
              <div class="HStack">
                <div v-if="!editingName" class="editable" :class="{ shaking: editMode }">
                  {{ student.name }}
                </div>
                <div v-if="editMode && editingName">
                  <TextField v-model="student.name" />
                </div>
                <div v-if="editMode && !editingName">
                  <button class="hover:text-green-500 button-circle" @click="editingStudentName">
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="HStack">
                <div v-if="!editingLastname" class="editable" :class="{ shaking: editMode }">
                  {{ student.surname }}
                </div>
                <div v-if="editMode && editingLastname">
                  <TextField v-model="student.surname" />
                </div>
                <div v-if="editMode && !editingLastname">
                  <button
                    class="hover:text-green-500 button-circle"
                    @click="editingStudentLastname"
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </h1>
          <span class="text-left text-lg font-light font-sans">
            <div class="HStack">
              <div v-if="!editingAdvisor" class="editable" :class="{ shaking: editMode }">
                <div v-if="student?.advisor.id">
                  Advisor: {{ student?.advisor.name }} {{ student?.advisor.surname }}<br />
                </div>
                <div v-else>Advisor: Not have</div>
              </div>
              <div v-if="editMode && editingAdvisor">
                <Picker
                  class="text-white"
                  v-model="student.advisor.id"
                  :options="advisors"
                  :keyExtractor="(advisor) => advisor.id"
                  :valueExtractor="(advisor) => advisor.id"
                  :textExtractor="(advisor) => `${advisor.name} ${advisor.surname}`"
                />
              </div>
              <div v-if="editMode && !editingAdvisor">
                <button class="hover:text-green-500 button-circle" @click="editingStudentadvisor">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Advisor: {{ student?.advisor.name }} {{ student?.advisor.surname }}<br /> -->
            <!-- beyond the SE311 LAB. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto provident asperiores fugit repellendus fugiat iure odit quae blanditiis error. Sed eum nihil odio omnis sunt perspiciatis dolorem, eligendi culpa consequatur. -->
          </span>
        </div>
        <div class="HStack md:w-1/2 md:justify-end">
          <div class="VStack md:justify-end">
            <div class="VStack">
              <div v-if="editMode && !editingPicture" class="HStack justify-end">
                <button class="hover:text-green-500 button-circle" @click="editingStudentpicture">
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
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </button>
              </div>
              <div v-if="editMode && editingPicture">
                <!-- <ImageUpload v-model="student.images" /> -->
                Not available in you region
              </div>

              <div v-if="!editingPicture">
                <img
                  :key="student?.images[0]"
                  :src="student?.images[0]"
                  alt="student image"
                  class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg editable"
                  :class="{ shaking: editMode }"
                />
              </div>
            </div>
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
  -webkit-transform: rotate(-0.5deg);
  -moz-transform: rotate(-0.5deg);
}
@keyframes jiggle {
  0% {
    transform: rotate(-0.5deg);
  }
  50% {
    transform: rotate(0.5deg);
  }
}

@-webkit-keyframes jiggle {
  0% {
    -webkit-transform: rotate(-0.5deg);
  }
  50% {
    -webkit-transform: rotate(0.5deg);
  }
}

@-moz-keyframes jiggle {
  0% {
    -moz-transform: rotate(-0.5deg);
  }
  50% {
    -moz-transform: rotate(0.5deg);
  }
}
</style>
