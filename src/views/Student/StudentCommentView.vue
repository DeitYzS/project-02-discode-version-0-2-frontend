<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import CommentList from '@/components/CommentList.vue'
import CommentForm from '@/components/CommentForm.vue';
const store = useStudentStore()
const { student } = storeToRefs(store)
</script>

<template>
  <CommentForm />
  <CommentList />
</template>
