<script lang="ts" setup>
import { useAdvisorStore } from '@/stores/advisor'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { AdvisorItem } from '@/type'
import type { PropType } from 'vue'
import TextField from '@/components/TextField.vue'
import AdvisorService from '@/services/AdvisorService'
const store = useAdvisorStore()
const { advisor } = storeToRefs(store)

const editMode = ref(false)
const editingName = ref(false)
const editingLastname = ref(false)
const editingPicture = ref(false)
const editingEmail = ref(false)
const id = ref(advisor.value?.id)

const toggleEditMode = async () => {
  editMode.value = !editMode.value;
  if (!editMode.value) {
    editingName.value = false;
    editingLastname.value = false;
    editingEmail.value = false;
    editingPicture.value = false;

    const updatedProperties = {
      name: advisor.value?.name || '',
      surname: advisor.value?.surname || '',
      email: advisor.value?.email || '',
    };

    if (id.value) {
      updateAdvisor(id.value, updatedProperties);
    }
  }
}

const updateAdvisor = async (id: number, updatedProperties: { name: string; surname: string; email: string }) => {
  try {
    const response = await AdvisorService.updateAdvisor(id, updatedProperties);
    console.log('Advisor updated successfully', response.data);
  } catch (error) {
    console.error('Failed to update advisor', error);
  }
}





// const advisorStore = useAdvisorStore()
// const advisor = storeToRefs(advisorStore).advisor
const editingAdvisorName = () => {
  editingName.value = true
  editMode.value = true
}

const editingAdvisorpicture = () => {
  editingPicture.value = true
  editMode.value = true
}

const editingAdvisorEmail = () => {
  editingEmail.value = true
  editMode.value = true
}

const editingAdvisorLastname = () => {
  editingLastname.value = true
  editMode.value = true
}

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
      <div class="h-auto w-full">
        <div class="HStack justify-between">
          <div class="VStack justify-center">
            <RouterLink :to="{ name: 'advisor-list' }" class="hover:text-green-500 button-circle">
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
        <div v-if="advisor" class="VStack safe-area md:w-1/2">
          <p class="text-2xl font-secondary">Advisor</p>
          <!-- <p class="font-bold text-lg">{{ id }}</p> -->

          <h1 class="text-left text-5xl font-medium black font-primary">
            <!-- {{ advisor.name }} {{ advisor.surname }} <br /> -->

            <div class="HStack gap-4">
              <div class="HStack">
                <div v-if="!editingName" class="editable" :class="{ shaking: editMode }">
                  {{ advisor.name }}
                </div>

                <div v-if="editMode && editingName">
                  <TextField v-model="advisor.name" />
                </div>
                <div v-if="editMode && !editingName">
                  <button class="hover:text-green-500 button-circle" @click="editingAdvisorName">
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
                  {{ advisor.surname }}
                </div>
                <div v-if="editMode && editingLastname">
                  <TextField v-model="advisor.surname" />
                </div>
                <div v-if="editMode && !editingLastname">
                  <button
                    class="hover:text-green-500 button-circle"
                    @click="editingAdvisorLastname"
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

          <div class="HStack">
            <div v-if="!editingEmail" class="editable" :class="{ shaking: editMode }">
              <span class="text-left text-lg font-light font-sans">
                Email: {{ advisor.email }} <br />
              </span>
            </div>
            <div v-if="editMode && editingEmail">
              <TextField v-model="advisor.email" />
            </div>
            <div v-if="editMode && !editingEmail">
              <button class="hover:text-green-500 button-circle" @click="editingAdvisorEmail">
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
        <div class="HStack md:w-1/2 md:justify-end">
          <div class="VStack md:justify-end">
            <div class="VStack">
              <div v-if="editMode && !editingPicture" class="HStack justify-end">
                <button class="hover:text-green-500 button-circle" @click="editingAdvisorpicture">
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
                  :key="advisor?.images[0]"
                  :src="advisor?.images[0]"
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

      <section class="window-ignore p-4">
        <div class="HStack flex items-center justify-center w-full">
          <div class="VStack w-1/2 flex items-center justify-center">
            <RouterLink class="hover:text-red-400" :to="{ name: 'advisor-detail' }"
              ><p class="text-xl">Announcement</p>
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
