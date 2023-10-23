<script setup lang="ts">
import CommentService from '@/services/CommentService'
// import { useCommentStore } from '@/stores/comment'
// import { storeToRefs } from 'pinia'
import type { CommentItem } from '@/type'
import router from '@/router'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { ref } from 'vue'

const comments: Ref<Array<CommentItem>> = ref([])

CommentService.getCommentBy()
  .then((res: AxiosResponse<CommentItem[]>) => {
    comments.value = res.data
    console.log(comments.value)
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })
</script>

<template>
  <div class="flex flex-col m-4 window-base justify-center align-middle" v-for="comment in comments" :key="comment.id">
    <div class="flex p-2 mb-2 ">
      <div class="w-1/3 text-center flex items-center justify-center">
        <p>AdvisorID:{{ comment.history.advisorId }}</p>
      </div>
      <div class="w-2/3 flex items-center justify-center">
        <p>{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-base {
  max-width: 300px;
  min-height: 100px;
}

</style>
