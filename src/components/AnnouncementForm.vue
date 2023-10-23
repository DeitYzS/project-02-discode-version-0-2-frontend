<template>
    <form id="commentForm" class="window-base rounded-lg shadow-sm p-2 mt-4">
      <div class="VStack relative">
        <!-- <textarea class="window-secondary h-36 rounded-md" v-model="newCommentText"></textarea> -->
        <div class="HStack absolute bottom-0 right-0">
          <!-- <input class="secondary-button " type="button" value="Announcement" @click="submitComment" /> -->
        </div>
      </div>
    </form>
  </template>
  
  <script setup lang="ts">
  
  </script>
  
  
  <style scoped>
  #commentForm {
    text-decoration: none;
    /* max-width: 500px; */
  }
  
  .ocean-blue {
    background-color: #1b9ff4;
    color: white;
    min-width: 87px;
  }
  
  .ocean-blue:hover {
    scale: 1.1;
  }
  
  .secondary-button{
    border-radius: 10px;
    margin: 10px;
     /* style */
  
  background: var(--windows-glass, rgba(0, 0, 0, 0.3));
  
  background-blend-mode: luminosity;
  
  /* Blur */
  backdrop-filter: blur(50px);
  }
  </style>
  