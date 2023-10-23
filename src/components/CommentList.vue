<script setup lang="ts">
import CommentService from '@/services/CommentService'
// import { useCommentStore } from '@/stores/comment'
// import { storeToRefs } from 'pinia'
import type { CommentItem } from '@/type';
import router from '@/router';
import type { AxiosResponse } from 'axios';
import type { Ref } from 'vue';
import { ref } from 'vue';

const comments: Ref<Array<CommentItem>> = ref([])

CommentService.getCommentBy()
  .then((res: AxiosResponse<CommentItem[]>) => {
    comments.value = res.data
    console.log(comments.value);
    
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })
</script>

<template>
  <div>
    <div v-for="comment in comments" :key="comment.id">
      <p>{{ comment.text }}</p>
    </div>
  </div>
</template>
