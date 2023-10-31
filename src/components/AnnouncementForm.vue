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
          <input
            type="file"
            id="fileInput"
            ref="fileInputRef"
            style="display: none"
            @change="handleFileUpload"
            multiple
          />
          <!-- File Button -->
          <button
            type="button"
            class="secondary-button group relative duration-1000 ease-in-out"
            @click="triggerFileInput"
          >
            <div>
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
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </div>
            <div v-if="!fileName" class="ml-4 hidden group-hover:block">Attach file</div>
          </button>
          <!-- Render file names and remove buttons -->
          <div v-for="(file, index) in attachedFiles" :key="index" class="secondary-button ml-4">
            <div class="HStack">
              {{ file.name }}
              <button @click="removeAttachedFile(index)" class="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
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
let fileName = ref('') // Initialize as an empty string
const attachedFiles = ref<File[]>([]) // Store attached files
// Specify the type of $refs.fileInputRef
const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  document.getElementById('fileInput')?.click()
}

const handleFileUpload = (event: Event) => {
  const selectedFiles = (event.target as HTMLInputElement).files

  // Check if files is not null
  if (selectedFiles) {
    // Clear the previous value of fileName
    fileName.value = ''

    // Iterate over selected files and add them to the attachedFiles array
    for (let i = 0; i < selectedFiles.length; i++) {
      attachedFiles.value.push(selectedFiles[i])
    }

    // Update the file names
    fileName.value = attachedFiles.value.map((file) => file.name).join(', ')
  }
}

const removeAttachedFile = (index: number) => {
  attachedFiles.value.splice(index, 1)

  // Update the file names
  fileName.value = attachedFiles.value.map((file) => file.name).join(', ')
}


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
