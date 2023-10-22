<template>
  <div>
    <h1>Create an student</h1>

    <form @submit.prevent="saveStudent">

      <BaseInput v-model="student.studentId" type="text" label="Category" />

      <h3>Name</h3>

      <BaseInput v-model="student.name" type="text" label="Title" />

      <label>Surname</label>

      <BaseInput v-model="student.surname" type="text" placeholder="Description" class="field" />

      <!-- <h3>Where is your event?</h3>
    
          <label>Location</label>
    
          <BaseInput
            v-model="student."
            type="text"
            placeholder="Location"
            class="field"
          /> -->

      <h3>Who is your Advisor?</h3>
      <label>Select an Advisor</label>
      <BaseSelect
			label="Organizer"
			v-model="student.advisor!.id"
			:options="advisor"
			:key-extractor="(x) => x.id"
			:value-extractor="(x) => x.id"
			:text-extractor="(x) => x.name" 
        />

      <h3>The image of the Event</h3>
      <ImageUpload v-model="student.images" />

      <button type="submit" class="bg-amber-500">Submit</button>
    </form>

    <pre>{{ student }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { StudentItem, AdvisorItem } from '@/type'
import StudentService from '@/services/StudentService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import BaseInput from '@/components/BaseInput.vue'
import AdvisorService from '@/services/AdvisorService'
import type { AxiosResponse } from 'axios'
import BaseSelect from '@/components/BaseSelect.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { string } from 'yup'

const store = useMessageStore()
const router = useRouter()
const advisor = ref<AdvisorItem[]>([])

AdvisorService.getAdvisorBy()
  .then((res: AxiosResponse<AdvisorItem[]>) => {
    advisor.value = res.data
  })
  .catch (() => {
    router.push({ name: 'network-error' })
  })

const student = ref<StudentItem>({
  id: 0,
  studentId: 0,
  name: '',
  surname: '',
  images: [],
  advisor: {
    id: 0,
    name: '',
    surname: '',
    email: '',
    images: [],
    roles: []
  },
  comments: [
    {
      id: 0,
      text: '',
      author: ''
    }
  ],
  course_list: [],
  roles: []
})

function saveStudent() {
  StudentService.saveStudent(student.value)
  .then((res) => {
    console.log(res.data)
    router
      .push({
        name: 'student-detail',
        params: { id: res.data.id }
      })
      .catch(() => {
        router.push({ name: 'network-error' })
      })

    store.updateMessage('You are successfully add a new student for' + res.data.studentId)
    setTimeout(() => {
      store.resetMessage()
    }, 3000)
  })
}
</script>
