<script setup lang="ts">
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import AnnouncementList from '@/components/AnnouncementList.vue'
const store = useStudentStore()
const { student } = storeToRefs(store)
defineProps({ students: { type: Object as PropType<StudentItem>, required: true } })
</script>

<template>
  <main class="h-full w-full">
    <div class="w-full h-full VStack">
      <div class="HStack w-full gap-8">


        <div class="w-1/5 VStack window-safe ">
          <div class="VStack secondary-button window-secondary">Advisor</div>
          <div class="VStack h-1/2 p-4 text-center items-center">
            <img
              :key="student?.advisor.images[0]"
              :src="student?.advisor.images[0]"
              alt="student image"
              class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg editable"
            />
            <p class="font-secondary">
              {{ student?.advisor.name }} {{ student?.advisor.surname }}<br />
            </p>
          </div>
        </div>


        <div class="w-4/5 VStack h-full window-safe">
          <div class="VStack secondary-button window-secondary">Anouncement</div>
          <div class="HStack w-full h-full justify-start items-top">
            <AnnouncementList class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.secondary-button {
  margin: 0;
}
</style>
