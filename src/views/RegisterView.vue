<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import * as yup from 'yup'
import { useField, useForm } from 'vee-validate'
import InputText from '@/components/InputText.vue'
import TextField from '@/components/TextField.vue'
const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()

const validationSchema = yup.object({
  studentId: yup.string().required('The student ID is required'),
  username: yup.string().required('The email is required'),
  password: yup.string().required('The password is required'),
  firstname: yup.string().required('The firstname is required'),
  lastname: yup.string().required('The lastname is required'),
  email: yup.string().required('The email is required').email()
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    studentId: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: ''
  }
})

const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: firstname } = useField<string>('firstname')
const { value: lastname } = useField<string>('lastname')
const { value: username } = useField<string>('username')
const { value: studentId } = useField<string>('studentId')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)
  try {
    await authStore.registerStudent(
      values.studentId,
      values.email,
      values.password,
      values.username,
      values.firstname,
      values.lastname
    )
    console.log('Register Success')
    router.push({ name: 'login' })
  } catch (err) {
    // messageStore.updateMessage('Could not register, maybe the current username was already used')
    // console.log(err)
    // setTimeout(() => {
    //   messageStore.resetMessage()
    // }, 3000)
    router.push({ name: 'login' })
  }
})
</script>



<template>
  <main class="container mx-auto px-4">
    <div class="flex flex-col items-center justify-center gap-4 px-6 py-12 lg:px-8 window-base">
      <p class="font-medium text-2xl">Registration</p>
      <p class="text-base max-w-xl text-justify">Welcome, student! We’re thrilled that you’ve chosen to join our Discode system. This platform is designed to enhance your learning experience and foster a vibrant community of learners. To get started, please register your account.</p>
      <form
        action="#"
        method="POST"
        @submit.prevent="onSubmit"
        class="w-full max-w-md items-center justify-center VStack items-center"
      >
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>StudentID</h5>
          <TextField type="text" v-model="studentId" :error="errors['studentId']"></TextField>
        </div>
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>Username</h5>
          <TextField type="text" v-model="username" :error="errors['username']"></TextField>
        </div>
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>Firstname</h5>
          <TextField type="text" v-model="firstname" :error="errors['firstname']"></TextField>
        </div>
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>Lastname</h5>
          <TextField type="text" v-model="lastname" :error="errors['lastname']"></TextField>
        </div>
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>Email</h5>
          <TextField type="text" v-model="email" :error="errors['email']"></TextField>
        </div>
        <div class="my-5 VStack w-full flex flex-col items-start">
          <h5>Password</h5>
          <TextField type="password" v-model="password" :error="errors['password']"></TextField>
        </div>

        <div class="flex justify-center mt-4">
          <button type="submit" class="secondary-button">Submit</button>
        </div>
      </form>
    </div>
  </main>
</template>



<style scoped></style>
