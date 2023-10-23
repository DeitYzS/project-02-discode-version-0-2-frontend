<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
const authStore = useAuthStore()
const router = useRouter()
const store = useMessageStore()
const { message } = storeToRefs(store)
const token = localStorage.getItem('token')
const student = localStorage.getItem('student')
const advisor = localStorage.getItem('advisor')
const isScrolled = ref(false)

if (token && student) {
  authStore.reloadStudent(token, JSON.parse(student))
} else if (token && advisor) {
  authStore.reloadAdvisor(token, JSON.parse(advisor))
} else {
  authStore.logout()
}

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

function handleScroll() {
  // Update isScrolled based on the scroll position
  isScrolled.value = window.scrollY > 0
}
</script>

<template>
  <div class="bg-container text-white">
    <header class="p-4 sticky top-0 z-10" :class="{ 'bg-color': isScrolled }">
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>

      <!-- Toolbar item -->
      <nav class="container mx-auto px-4" id="nav">
        <div class="HStack justify-between" id="logo">
          <!-- left side -->

          <div class="logo VStack justify-center">
            <div v-if="authStore.isAdmin || authStore.isAdvisor">
              <router-link to="/"
                ><p class="font-semibold text-2xl font-secondary">Ultimate Alein</p></router-link
              >
            </div>
            <div v-if="authStore.isStudent">
              <router-link :to="{ name: 'student-detail', params: { id: authStore.student?.id } }">
                <p class="font-semibold text-2xl font-secondary">Ultimate Alein</p>
              </router-link>
            </div>
          </div>

          <!-- rigth side -->
          <div class="font-base space-x-4 flex flex-row">
            <div
              v-if="authStore.isAdmin || authStore.isAdvisor"
              class="VStack justify-center ml-8 space-x-2"
            >
              <router-link to="/userlist">Users list</router-link>
            </div>
            <!-- <div v-if="authStore.isAdvisor" class="VStack justify-center ml-8 space-x-2">
              <router-link to="/userlist">Users list</router-link>
            </div> -->

            <nav>
              <nav class="flex justify-center">
                <ul
                  v-if="!authStore.currentUserNameStudent && !authStore.curretUserNameAdvisor"
                  class="flex navbar-nav ml-auto"
                >
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

                <ul
                  v-if="authStore.currentUserNameStudent || authStore.curretUserNameAdvisor"
                  class="flex navbar-nav ml-auto secondary-button"
                >
                  <li class="nav-item px-2">
                    <div v-if="authStore.isAdvisor">
                      <router-link :to="{ name: 'advisor-detail', params: { id: authStore.advisor?.id } }" class="nav-link font-secondary">
                        <font-awesome-icon icon="user" />

                        {{ authStore.currentUserNameStudent || authStore.curretUserNameAdvisor }} |
                      </router-link>
                    </div>
                    <div v-if="authStore.isStudent">
                      <router-link :to="{ name: 'student-detail', params: { id: authStore.student?.id } }" class="nav-link font-secondary">
                        <font-awesome-icon icon="user" />

                        {{ authStore.currentUserNameStudent || authStore.curretUserNameAdvisor }} |
                      </router-link>
                    </div>
                    <div v-if="authStore.isAdmin">
                       {{ "ADMIN" }}

                    </div>
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
.secondary-button {
  margin: 0;
}
.bg-color {
  background: linear-gradient(
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.1)
  ); /* Adjust the opacity values as needed */
  backdrop-filter: blur(10px);
}

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
