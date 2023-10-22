<script setup lang="ts">
import type { AdvisorItem } from "@/type";
import { ref } from "vue";
import AdvisorService from "@/services/AdvisorService";
import { useRouter } from "vue-router";
import { useMessageStore } from "@/stores/message";
import ImageUpload from "@/components/ImageUpload.vue";
import TextField from "@/components/TextField.vue";
const store = useMessageStore()
const router = useRouter()



const advisor =ref<AdvisorItem> ({
  id: 0,
  name: ' ',
  surname: ' ',
  email:' ',
  image: [],
  roles: [],
})

function  saveAdvisor() {
  AdvisorService.saveAdvisor(advisor.value)
      .then((res) => {
        console.log(res.data)
        router.push({
          name: 'advisor-detail',
          params: { id: res.data.id }
        }) . catch(() => {
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
      <form @submit.prevent="saveAdvisor">
        <button type="submit" class="bg-blue-500 p-4 m-6 rounded-lg">Submit</button>

        <div class="VStack gap-12">
          <div class="VStack justify-center md:HStack">
            <div class="VStack items-center">
              <label class="pb-2 tex">Firstname</label>
              <TextField
                class="text-field text-left mx-auto"
                v-model="advisor.name"
                type="text"
                label="Firstname"
              />
            </div>
            <div class="VStack items-center">
              <label class="pb-2">Surname</label>
              <TextField
                class="text-left mx-auto"
                v-model="advisor.surname"
                type="text"
              />
            </div>
          </div>
          <div class="VStack gap-4">
            <h3 class="text-left">Email</h3>
            <TextField
                class="text-left mx-auto"
                v-model="advisor.email"
                type="text"
              />
          </div>
          
          <div class="VStack gap-4">
            <p>Profile upload</p>
            <ImageUpload v-model="advisor.image" />
          </div>
        </div>

      </form>

      <!-- <pre>{{ student }}</pre> -->
    </div>
  </main>
</template>
<style>

</style>
