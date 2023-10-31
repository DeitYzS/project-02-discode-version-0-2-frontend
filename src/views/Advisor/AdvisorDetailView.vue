<script setup lang="ts">
import type { StudentItem } from '@/type'
import type { PropType } from 'vue'
import AnnouncementForm from '@/components/AnnouncementForm.vue';
import AnnouncementList from '@/components/AnnouncementList.vue';
defineProps({ student: { type: Object as PropType<StudentItem>, required: true } })
</script>

<template>
    <AnnouncementForm />
</template>
