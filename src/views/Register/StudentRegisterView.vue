<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '@/stores/message'

const emit = defineEmits(['add-student'])

const store = useMessageStore()

const studentName = ref('')
const studentSurname = ref('')
const studentImage = ref('')
const studentID = ref('')
const studentAdvisor = ref('')
const studentCouse = ref('')

// const props = defineProps( {
//   newAdvisor: {
//     required:true,
//     type: Number
//   }
// })

const submitInfo = () => {
  if (
    !studentName.value.trim() ||
    !studentSurname.value.trim() ||
    !studentImage.value.trim() ||
    !studentID.value.trim() ||
    !studentAdvisor.value.trim() ||
    !studentCouse.value.trim()
  ) {
    alert('Please fill in all fields.')
    return
  }

  const newStudent = {
    id: studentID.value, // Generate a new ID
    name: studentName.value,
    surname: studentSurname.value,
    image: studentImage.value,
    advisorId: studentAdvisor.value,
    couse_list: studentCouse.value,
    comments: []
  }

  store.updateMessage(
    'You are successfully added for ' + studentName.value + ' ' + studentSurname.value
  )
  setTimeout(() => {
    store.resetMessage()
  }, 3000)
  // router.push({
  //   name: 'event-detail',
  //   params: {
  //     id: props.event?.id
  //   }
  // })

  console.log(newStudent)

  emit('add-student', newStudent)

  studentName.value = ''
  studentSurname.value = ''
  studentImage.value = ''
  studentID.value = ''
  studentAdvisor.value = ''
  studentCouse.value = ''
}
</script>
<template>
  <div class="VStack space-y-4 p-4">
    <div class="HStack space-x-4 text-left">
      <div class="VStack">
        <label for="studentName">Name</label>
        <input v-model="studentName" type="text" id="studentName" name="name" class="rounded-lg h-8 p-2" />
      </div>
      <div class="VStack">
        <label for="studentSurname">Surname</label>
        <input v-model="studentSurname" type="text" id="studentSurname" name="surname" class="rounded-lg h-8 p-2" />
      </div>
    </div>
    <div class="VStack text-left">
      <label for="studentID">Student ID</label>
      <input v-model="studentID" type="text" id="studentID" name="studentID" class="rounded-lg h-8 p-2" />
    </div>
    <div class="VStack text-left">
      <label for="studentImage">Profile</label>
      <input v-model="studentImage" type="text" id="studentImage" name="image" class="rounded-lg h-8 p-2" />
    </div>
    <div class="VStack text-left">
      <label for="studentAdvisor">Advisor</label>
      <input v-model="studentAdvisor" type="text" id="studentAdvisor" name="advisor" class="rounded-lg h-8 p-2" />
    </div>
    <div class="VStack text-left">
      <label for="studentCouses">Couse</label>
      <input
        v-model="studentCouse"
        type="text"
        id="studentCouses"
        name="couses"
        class="rounded-lg h-8 p-2"
        placeholder="SE123,SE124"
      />
    </div>
    <button @click="submitInfo" class="ocean-blue p-2 rounded-lg">Submit</button>
  </div>
</template>


<style scoped>
.ocean-blue {
  background-color: #1b9ff4;
  color: white;
  min-width: 120px;
}
</style>
@/stores/message