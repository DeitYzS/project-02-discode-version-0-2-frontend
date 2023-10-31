<template>
  <div class="window-base mt-4">
    <div v-if="status" class="VStack items-center align-middle justify-center h-full">
      <p class="text-white text-3xl mt-4">Done!</p>
    </div>
    <form
      v-if="!status"
      id="announcementForm"
      class="rounded-lg shadow-sm p-2 mt-4"
      @submit.prevent="submitAnnouncement"
    >
      <div class="VStack relative gap-2 p-4">
        <p class="text-xl font-medium">Title</p>
        <input
          type="text"
          class="window-secondary rounded-md text-primary"
          v-model="newAnnouncementTitle"
          placeholder="Enter your title here"
        />
        <p class="text-xl font-medium">Description</p>

        <textarea
          class="window-secondary h-36 rounded-md text-primary"
          v-model="newAnnouncementText"
          placeholder="Enter your announcement here"
        ></textarea>
        <div class="HStack absolute bottom-5 right-5">
          <input
            class="secondary-button"
            type="button"
            value="Announcement"
            @click="submitAnnouncement"
          />
        </div>
        <div class="HStack absolute bottom-5 left-5">
          <!-- File Input -->
         
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import announcementService from '@/services/AnnocementService'
import { useAuthStore } from '@/stores/auth'
import type { AdvisorItem } from '@/type'
const authStore = useAuthStore()

const status = ref(false)
const newAnnouncementTitle = ref('')
const newAnnouncementText = ref('')

const submitAnnouncement = async () => {
  const announcement = {
    id: 0,
    title: newAnnouncementTitle.value,
    description: newAnnouncementText.value,
    files: attachedFiles.value.map((file) => file.name), // Only send the file names
    advisor: authStore.advisor as AdvisorItem
  }
  try {
    const response = await announcementService.saveAnnouncement(announcement)
    console.log(response)
    status.value = true
    newAnnouncementTitle.value = ''
    newAnnouncementText.value = ''
    attachedFiles.value = []

    setTimeout(() => {
      status.value = false
    }, 3000)
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
#commentForm {
  text-decoration: none;
  /* max-width: 500px; */
}
.text-primary,
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 1);
}
.secondary-button {
  border-radius: 10px;
  margin: 10px;
  /* style */

  background: var(--windows-glass, rgba(0, 0, 0, 0.3));

  background-blend-mode: luminosity;

  /* Blur */
  backdrop-filter: blur(50px);
}
.window-base {
  min-height: 300px;
}
</style>
