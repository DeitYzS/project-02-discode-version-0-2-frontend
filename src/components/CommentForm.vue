<template>
  <div class="window-base mt-4">
    <div v-if="status" class="VStack items-center align-middle justify-center h-full">
      <p class="text-white text-3xl mt-4">Done!</p>
    </div>
    <form
      v-if="!status"
      id="commentForm"
      class="rounded-lg shadow-sm p-2 mt-4"
      @submit.prevent="submitComment"
    >
      <div class="VStack relative gap-2 p-4">
        <p class="text-xl font-medium">Text</p>
        <textarea
          class="window-secondary h-36 rounded-md text-primary"
          v-model="newCommentText"
          placeholder="Enter your comment here"
        ></textarea>
        <div class="HStack absolute bottom-5 right-5">
          <input
            class="secondary-button"
            type="button"
            value="Save Comment"
            @click="submitComment"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommentService from '@/services/CommentService'
import { useAuthStore } from '@/stores/auth'
import type { AdvisorItem, CommentItem } from '@/type'
const authStore = useAuthStore()

const status = ref(false)
const newCommentText = ref('')
const submitComment = async () => {
  const comment: CommentItem = {
    id: 0,
    text: newCommentText.value,
    sentByAdvisor: false, // Or true, depending on your requirements
    history: {
      id: 0,
      studentId: 0,
      advisorId: 0,
      commentHistory: []
    }
  }

  try {
    const response = await CommentService.saveComment(comment)
    console.log(response)
    console.log(comment);
    
    status.value = true
    newCommentText.value = ''

    setTimeout(() => {
      status.value = false
    }, 3000) // Change status back to false after 3 seconds
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
textarea::placeholder{
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
