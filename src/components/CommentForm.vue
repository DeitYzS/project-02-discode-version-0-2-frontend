<template>
  <div class="window-base mt-4">
    <form
      id="announcementForm"
      class="rounded-lg shadow-sm p-2 mt-4"
      @submit.prevent="submitAnnouncement"
    >
      <div class="VStack relative gap-2 p-4">
        <p class="text-xl font-medium">Comment</p>

        <textarea
          class="window-secondary h-36 rounded-md text-primary"
          v-model="comment.text"
          placeholder="Enter your comment here"
        ></textarea>

        <div class="HStack absolute bottom-5 right-5">
          <button class="secondary-button" type="button" @click="submitAnnouncement">
            Comment
          </button>
        </div>
      </div>
    </form>
    <CommentList />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import CommentService from '@/services/CommentService'
import { useAuthStore } from '@/stores/auth'
import type { AdvisorItem } from '@/type'
import type { CommentItem } from '@/type'
import CommentList from './CommentList.vue'
const authStore = useAuthStore()
const comment = ref<CommentItem>({
  id: 0,
  text: '',
  sentByAdvisor: false,
  history: {
    id: 0,
    studentId: 0,
    advisorId: 0,
    commentHistory: []
  }
})

const submitAnnouncement = async () => {
  CommentService.saveComment(comment.value).then((res) => {
    console.log(res.data)
  })
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
