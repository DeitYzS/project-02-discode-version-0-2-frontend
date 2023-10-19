<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '@/stores/massage'

const emit = defineEmits(['add-advisor'])

const store = useMessageStore()

const advisorName = ref('')
const advisorSurname = ref('')
const advisorImage = ref('')
const advisorEmail = ref('')

// const props = defineProps( {
//   newAdvisor: {
//     required:true,
//     type: Number
//   }
// })

const submitInfo = () => {
  if (
    !advisorName.value.trim() ||
    !advisorSurname.value.trim() ||
    !advisorImage.value.trim() ||
    !advisorEmail.value.trim()
  ) {
    alert('Please fill in all fields.')
    return
  }

  const newAdvisor = {
    id: 0, // Generate a new ID
    name: advisorName.value,
    surname: advisorSurname.value,
    image: advisorImage.value,
    email: advisorEmail.value
  }

  store.updateMessage(
    'You are successfully added for ' + advisorName.value + ' ' + advisorSurname.value
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

  console.log(newAdvisor)

  emit('add-advisor', newAdvisor)

  advisorName.value = ''
  advisorSurname.value = ''
  advisorImage.value = ''
  advisorEmail.value = ''
}
</script>

<template>
  <div class="VStack space-y-4 p-4">
    <div class="HStack space-x-4 text-left">
      <div class="VStack">
        <label for="name">Name</label>
        <input v-model="advisorName" type="text" id="name" name="name" class="rounded-lg h-8 p-2" />
      </div>
      <div class="VStack">
        <label for="surname">Surname</label>
        <input
          v-model="advisorSurname"
          type="text"
          id="surname"
          name="surname"
          class="rounded-lg h-8 p-2"
        />
      </div>
    </div>
    <div class="VStack text-left">
      <label for="image">Profile</label>
      <input
        v-model="advisorImage"
        type="text"
        id="image"
        name="image"
        class="rounded-lg h-8 p-2"
      />
    </div>
    <div class="VStack text-left">
      <label for="email">Email</label>
      <input
        v-model="advisorEmail"
        type="text"
        id="email"
        name="email"
        class="rounded-lg h-8 p-2"
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
