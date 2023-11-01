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

AnnouncementService.getAnnouncementBy()
  .then((res: AxiosResponse<AnnItem[]>) => {
    console.log('All announcements:', res.data) // Log all announcements

    // Filter the announcements to include only those by the student's advisor
    announcements.value = res.data.filter(
      (announcement) => announcement.advisor.id == student?.advisor.id
    )
    console.log('Filtered announcements:', announcements.value) // Log filtered announcements
  })
  .catch(() => {
    router.push({ name: 'network-error' })
  })

function getFileName(url : any) {
  var parts = url.split('/')
  var lastPart = parts[parts.length - 1]
  var part2 = decodeURIComponent(lastPart)
  var part3 = part2.split('=')
  var part4 = part3[1]
  var part5 = part4.split('?')
  var fileName = part5[0]
  return fileName
}
</script>

<template>
  <div>
    <div v-for="announcement in announcements" :key="announcement.advisor.id">
      <div class="safe-area bubble text-black w-full">
        <p class="text-primary">{{ announcement.title }}</p>
        <p class="text-secondary">{{ announcement.description }}</p>
        <div v-if="announcement.files">
          <div class="HStack gap-4 pr-4 m-2">
            <div v-for="(file, index) in announcement.files" :key="index">
              <a :href="file" target="_blank" class="secondary-button gap-2">
                <!-- Display file icon and file name -->
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
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>

                {{ getFileName(file) }}
              </a>
            </div>
          </div>
        </div>
        <div v-else>No file</div>
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
.secondary-button {
  border-radius: 5px;
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
