<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-container font-mono">
    <header id="Dock" class=" m-4 p-4 rounded-2xl">
        <nav class="HStack justify-between">
          <div  class="font-semibold text-2xl">
            <RouterLink to="/">Super idol</RouterLink>

          </div>
          <div class="font-base  space-x-4">

            <RouterLink to="/userlist">Users</RouterLink>
          </div>

        </nav>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>

/* .bg-container {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    #c5dbf2,
    #cee5fe,
    #f9f9f9,
    #f9ecfa,
    #f9f9f9,
    #cee5fe,
    #c5dbf2
  );
  animation: animateBg 10s linear infinite;
  background-size: 400% 400%;
} */

@keyframes animateBg {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
/* 
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */
/* 
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */
/* 
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
