<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const store = useMessageStore()
const { message } = storeToRefs(store)
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
if (token && user) {
  authStore.reload(token, JSON.parse(user))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="bg-container text-white">
    <header class="p-4 sticky top-0 z-10">
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>

      <nav class="container mx-auto px-4 ">
        <div class="HStack justify-between" id="logo">
          <div class="logo">
            <RouterLink to="/"
              ><p class="font-semibold text-2xl font-secondary">Ultimate Alein</p></RouterLink
            >
          </div>

  
          <div class="font-base space-x-4 flex flex-row">
            <RouterLink to="/userlist">Users</RouterLink>

            <ul v-if="!authStore.currentUserName" class="flex navbar-nav ml-auto">
              
              <li class="nav-item px-2 ">
                <ul class="flex flex-row">
                  <li class="nav-item px-2 ">
                    <router-link to="/register" class="nav-link">
                      <font-awesome-icon icon="user-plus" />Sign Up |
                    </router-link>
                  </li>

                  <li>
                    <router-link to="/login" class="nav-link">
                      <font-awesome-icon icon="sign-in" /> Login 
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>

            <ul v-if="authStore.currentUserName" class="flex navbar-nav ml-auto flex-row">
              <li class="nav-item px-2">
                <router-link to="/profile" class="nav-link">
                  <font-awesome-icon icon="user" />
                  {{ authStore.currentUserName }} |
                </router-link>
              </li>

              <li class="nav-item px-2">
                <a class="nav-link hover:cursor-pointer" @click="logout">
                  <font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Logout
                </a>
              </li>
            </ul>
  
          </div>
        </div>
      </nav>
    </header>

    <RouterView />
  </div>
  <link
    href="https://db.onlinewebfonts.com/c/2cb69c1d167cdd29fd32acd783e60e59?family=Good+Times+W00+Heavy"
    rel="stylesheet"
  />
</template>

<style scoped>
.bg-container::before {
  content: '';
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
