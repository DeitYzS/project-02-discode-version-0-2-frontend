<template>
  <form
    id="announcementForm"
    class="window-base rounded-lg shadow-sm p-2 mt-4"
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
          value="Save Announcement"
          @click="submitAnnouncement"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import announcementService from '@/services/AnnocementService'
import { useAuthStore } from '@/stores/auth'
import type { AdvisorItem } from '@/type'
const authStore = useAuthStore()

const newAnnouncementTitle = ref('')
const newAnnouncementText = ref('')

const submitAnnouncement = async () => {
  const announcement = {
    id: 0,
    title: newAnnouncementTitle.value,
    description: newAnnouncementText.value,
    advisor: authStore.advisor as AdvisorItem
  }

  try {
    const response = await announcementService.saveComment(announcement)
    console.log(response)
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
.text-primary{
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
</style>
