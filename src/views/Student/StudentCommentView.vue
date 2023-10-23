<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import CommentList from '@/components/CommentList.vue'


const store = useStudentStore()
const { student } = storeToRefs(store)




</script>

<template>
  <!-- <CommentForm @add-comment="addComment" :newId="student?.comments.length" /> -->
  <CommentList/>
  Hey
</template>

