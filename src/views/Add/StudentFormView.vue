<script setup lang="ts">
import { ref } from 'vue'
import StudentService from '@/services/StudentService'

import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import type { StudentItem } from '@/type'
import type { AdvisorItem } from '@/type'
import AdvisorService from '@/services/AdvisorService'
import * as Axios from 'axios' // Import Axios for the function
import { computed } from 'vue'
import type { AxiosResponse } from 'axios' // Import AxiosResponse as a type
import TextField from '@/components/TextField.vue'
import Picker from '@/components/PickerField.vue'
import ImageUpload from '@/components/ImageUpload.vue'
const store = useMessageStore()
const router = useRouter()

const advisors = ref<AdvisorItem[]>([])

const selectedAdvisor = computed(() => {
  console.log('student.advisor.id:', student.value.advisor.id) // Log the current student advisor ID
  const advisor = advisors.value.find((advisor) => advisor.id === student.value.advisor.id)
  console.log('selectedAdvisor:', advisor) // Log the selected advisor
  return advisor ? advisor : null
})

AdvisorService.getAdvisorBy()
  .then((response: AxiosResponse<AdvisorItem[]>) => {
    advisors.value = response.data
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

const student = ref<StudentItem>({
  id: 0,
  studentId: 0,
  name: ' ',
  surname: ' ',
  image: [],
  advisor: {
    id: 0,
    name: ' ',
    surname: ' ',
    email: '',
    image:[],
    roles: []
  },
  comments: [],
  course_list: [],
  roles: []
})

function saveStudent() {
  StudentService.saveStudent(student.value).then((res) => {
    console.log(res.data)
    router
      .push({
        name: 'student-detail',
        params: { id: res.data.id }
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })

    store.updateMessage('You are successfully add a new event for' + res.data.name)
    setTimeout(() => {
      store.resetMessage()
    }, 3000)
  })
}
</script>
<template>
  <main class="h-full w-full">
    <div class="VStack w-full text-center items-center justify-center align-middle">
      <form @submit.prevent="saveStudent">
        <div class="VStack gap-12">
          <div class="VStack justify-center md:HStack">
            <div class="VStack items-center">
              <label class="pb-2 tex">Firstname</label>
              <TextField
                class="text-field text-left mx-auto"
                v-model="student.name"
                type="text"
                label="Firstname"
              />
            </div>
            <div class="VStack items-center">
              <label class="pb-2">Surname</label>
              <TextField
                class="text-left mx-auto"
                v-model="student.surname"
                type="text"
              />
            </div>
          </div>
          <div class="VStack gap-4">
            <h3>Who is your organiser?</h3>
            <div class="HStack justify-center md:justify-between ">
              <label class="hidden md:block">Advisor</label>
              <Picker
                class="text-black"
                v-model="student.advisor.id"
                :options="advisors"
                :keyExtractor="(advisor) => advisor.id"
                :valueExtractor="(advisor) => advisor.id"
                :textExtractor="(advisor) => `${advisor.name} ${advisor.surname}`"
              />
            </div>
          </div>
          <div class="VStack gap-4">
            <p>Profile upload</p>
            <ImageUpload v-model="student.image" />
          </div>
        </div>

        <button type="submit" class="bg-blue-500 p-4 m-6 rounded-lg">Submit</button>
      </form>

      <!-- <pre>{{ student }}</pre> -->
    </div>
  </main>

  <!-- </div> -->
</template>
<style scoped></style>
