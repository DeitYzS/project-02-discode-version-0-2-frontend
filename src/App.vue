<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-container text-white">
    <header class="p-4 sticky top-0 z-10">
      <nav class="container mx-auto px-4">
        <div class="HStack justify-between" id="logo">
          <div class="logo">
            <RouterLink to="/"><p class="font-semibold text-2xl font-secondary">Ultimate Alein</p></RouterLink>
          </div>
          <div class="font-base  space-x-4">

            <RouterLink to="/userlist">Users</RouterLink>
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
  <link href="https://db.onlinewebfonts.com/c/2cb69c1d167cdd29fd32acd783e60e59?family=Good+Times+W00+Heavy" rel="stylesheet">
</template>

<style scoped>

.bg-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: url('/src/assets/atmostphere.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
