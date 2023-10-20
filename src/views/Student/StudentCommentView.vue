<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentList from '@/components/CommentList.vue'
import { useAdvisorStore } from '@/stores/advisor'

const advisorStore = useAdvisorStore()
const store = useStudentStore()
const { student } = storeToRefs(store)
const advisor = storeToRefs(advisorStore).advisor
const id = ref(student.value?.id)

const addComment = (event: any) => {
  console.log(event)
  student.value?.comments.unshift(event)
}

watchEffect(() => {
  console.log(student.value)
})
</script>

<template>
  <div v-if="student">
    <CommentForm @add-comment="addComment" :newId="student?.comments.length" />

    <CommentList :comments="student.comments" :advisor="advisor" v-if="student && advisor" />
  </div>
</template>
