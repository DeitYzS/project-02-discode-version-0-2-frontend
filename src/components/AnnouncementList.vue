<script setup lang="ts">
import AnnouncementService from '@/services/AnnocementService'
import type { AnnItem } from '@/type'
import router from '@/router'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { useStudentStore } from '@/stores/student'

const studentStore = useStudentStore()
const student = studentStore.student // assuming this is how you get the current student

const announcements: Ref<Array<AnnItem>> = ref([])

AnnouncementService.getCommentBy()
  .then((res: AxiosResponse<AnnItem[]>) => {
    // Filter the announcements to include only those by the student's advisor
    announcements.value = res.data.filter(announcement => announcement.advisor.id === student?.advisor.id)
    console.log(announcements.value)
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })
</script>

<template>
  <div>
    <div v-for="announcement in announcements" :key="announcement.advisor.id">
      <div class="safe-area bubble text-black w-full">
        <p class="text-primary">{{ announcement.title }}</p>
        <p class="text-secondary">{{ announcement.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile {
  width: 80px;
  height: 80px;
  border-radius: 100px;
}
.safe-area {
  margin-top: 10px;
}
.bubble {
  background-color: white;
  border-radius: 16px;
  padding: 10px;
  width: 100%;
  height: 100%;
}

.text-primary {
  font-size: 18px;
  font-weight: 500;
  color: black;
}
.text-secondary {
  font-size: 15px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
