<template>
  <main class="container h-full w-full mx-auto px-4 py-8">
    <div
      class="VStack md:HStack items-center justify-center align-middle space-y-8 md:space-y-0 md:space-x-8"
    >
      <div class="VStack w-1/2 items-center justify-center align-middle space-y-4">
        <p class="text-4xl text-center">Mabuhay Thailand</p>
      </div>
      <div class="VStack w-1/2 items-center justify-center align-middle space-y-4">
        <div class="window items-center mt-8 space-y-8">
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600">
            Sign in to your account
          </h2>
          <form class="gap-4 space-y-8" @submit.prevent="onSubmit">
            <div class="VStack">
              <label for="email"> Email address </label>
              <InputText type="text" v-model="username" :error="errors['username']"></InputText>
            </div>

            <div class="VStack">
              <div class="HStack justify-between items-center align-middle">
                <label for="password"> Password </label>
                <div class="text-sm">
                  <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <InputText type="password" v-model="password" :error="errors['password']"></InputText>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center py-2 rounded-md bg-indigo-500 text-white font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                Sign in
              </button>
            </div>
          </form>
          <p class="mt-6 text-center text-sm text-gray-500">
            Not a member ?
            {{ ' ' }}
            <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Try to register here
            </a>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InputText from '@/components/InputText.vue'
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore()
const router = useRouter()
const authStore = useAuthStore()

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})
const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    username: '',
    password: ''
  }
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const onSubmit = handleSubmit((values) => {
  authStore
    .login(values.username, values.password)
    .then(() => {
      console.log('login success')
      if (authStore.isStudent) {
        router.push({ name: 'student-detail', params: { id: authStore.student?.id } })
      } else if (authStore.isAdmin) {
        router.push({ name: 'student-list' })
      } else if (authStore.isAdvisor) {
        router.push({ name: 'advisor-detail', params: { id: authStore.advisor?.id } })
      } else {
        router.push({ name: 'home-view' })
      }
      // router.push({ name: 'home-view'})
    })
    .catch((err) => {
      messageStore.updateMessage('could not login')
      setTimeout(() => {
        messageStore.resetMessage()
      }, 3000)
      console.log('error', err)
    })
})
</script>
