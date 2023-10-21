<!-- <script setup lang="ts">
import { ref } from "vue";
import EventService from "@/services/EventService";

import { useRouter } from "vue-router";
import { useMessageStore } from "@/stores/message";
import type { EventItem } from "@/type";
import type { Organiser } from "@/type";
import OrganiserService from "@/services/OrganiserService";
import * as Axios from "axios"; // Import Axios for the function

import type { AxiosResponse } from "axios"; // Import AxiosResponse as a type
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import ImageUpload from "@/components/ImageUpload.vue";
const store = useMessageStore();
const router = useRouter();
const organisers = ref<Organiser[]>([]);

OrganiserService.getOrganisersBy()
  .then((response: AxiosResponse<Organiser[]>) => {
    organisers.value = response.data;
  })
  .catch(() => {
    router.push({ name: "network-error" });
  });

const event = ref<EventItem>({
  category: " ",
  date: " ",
  description: " ",
  id: 0,
  location: " ",
  organiser: {
    id: 0,
    name: " ",
    address: " ",
    images: [],
    roles: [],
  },
  time: " ",
  title: " ",
  images: [],
});

function saveEvent() {
  EventService.saveEvent(event.value).then((res) => {
    console.log(res.data);
    router
      .push({
        name: "event-detail",
        params: { id: res.data.id },
      })
      .catch(() => {
        router.push({ name: "network-error" });
      });

    store.updateMessage(
      "You are successfully add a new event for" + res.data.title
    );
    setTimeout(() => {
      store.resetMessage();
    }, 3000);
  });
}
</script> -->
<template>
    <!-- <h1>Create an event</h1>
  
    <form @submit.prevent="saveEvent">
      <BaseInput v-model="event.category" type="text" label="Category" />
  
      <h3>Name & descirb your event</h3>
  
      <BaseInput v-model="event.title" type="text" label="Title" />
  
      <label>Description</label>
  
      <BaseInput
        v-model="event.description"
        type="text"
        placeholder="Description"
        class="field"
      />
  
      <h3>Where is your event?</h3>
  
      <label>Location</label>
  
      <BaseInput
        v-model="event.location"
        type="text"
        placeholder="Location"
        class="field"
      />
  
      <h3>Who is your organiser?</h3>
      <label>Select an Organiser</label>
      <BaseSelect
        v-model="event.organiser.id"
        label="Organiser"
        :options="organisers"
      />
  
      <h3>The image of the Event</h3>
      <ImageUpload v-model="event.images" />
  
      <button type="submit" class="bg-blue-500 p-4 rounded-lg">Submit</button>
    </form>
  
    <pre>{{ event }}</pre> -->
    <!-- </div> -->
    a
  </template>
  <style>
  
  </style>
  