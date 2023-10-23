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
const student = localStorage.getItem('student')
const advisor = localStorage.getItem('advisor')

if (token && student) {
  authStore.reloadStudent(token, JSON.parse(student))
}else {
  authStore.logout()
}

if (token && advisor) {
  authStore.reloadAdvisor(token, JSON.parse(advisor))
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

      <!-- Toolbar item -->
      <nav class="container mx-auto px-4" id="nav">
        <div class="HStack justify-between" id="logo">
          <!-- left side -->

          <div class="logo">
            <router-link to="/"
              ><p class="font-semibold text-2xl font-secondary">Ultimate Alein</p></router-link
            >
          </div>

          <!-- rigth side -->
          <div class="font-base space-x-4 flex flex-row">
            <div v-if="authStore.isAdmin" class="flex flex-row ml-8 space-x-2">
              <router-link to="/userlist">Users list</router-link>
            </div>
            <div v-if="authStore.isAdvisor" class="flex flex-row ml-8 space-x-2">
              <router-link to="/userlist">Users list</router-link>
            </div>

            <nav>
              <nav class="flex">
                <ul v-if="!authStore.currentUserNameStudent && !authStore.curretUserNameAdvisor" class="flex navbar-nav ml-auto">
                  <li class="nav-item px-2">
                    <ul class="flex flex-row">
                      <li class="nav-item px-2">
                        <router-link to="/register" class="nav-link">
                          <font-awesome-icon icon="user-plus" /> Sign Up
                        </router-link>
                        |
                      </li>

                      <li>
                        <router-link to="/login" class="nav-link">
                          <font-awesome-icon icon="sign-in" /> Login
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>

                <ul v-if="authStore.currentUserNameStudent || authStore.curretUserNameAdvisor" class="flex navbar-nav ml-auto">
                  <li class="nav-item px-2">
                    <router-link to="/profile" class="nav-link">
                      <font-awesome-icon icon="user" />
                      <div v-if="authStore.isAdmin">
                        {{ "ADMIN" }}
                      </div>
                      <div v-else>
                        {{ authStore.currentUserNameStudent || authStore.curretUserNameAdvisor }} |
                      </div>
                    </router-link>
                  </li>

                  <li class="nav-item px-2">
                    <a class="nav-link hover:cursor-pointer" @click="logout">
                      <font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Logout
                    </a>
                  </li>
                </ul>
              </nav>
            </nav>
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
