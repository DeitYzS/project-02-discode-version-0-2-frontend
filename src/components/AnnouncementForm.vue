<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import BaseInput from '@/components/BaseInput.vue'
import { ref } from 'vue'
import { type AdvisorItem, type AnnItem } from '@/type'
import AnnService from '@/services/AnnocementService'
import { useRouter } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { useAuthStore } from '@/stores/auth'
import AdvisorService from '@/services/AdvisorService'
const authStore = useAuthStore()
const status = ref(false)

const store = useMessageStore()
const router = useRouter()
const id = authStore.$id
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_FILE_URL)
function handleFilePondInit() {
  console.log('FilePond has initialized')
}
const pond = ref()

const ann = ref<AnnItem>({
  id: 0,
  title: '',
  description: '',
  files: [],
  advisor: {
    id: 0,
    name: ' ',
    surname: ' ',
    email: '',
    images: [],
    roles: [],
    studentList: []
  }
})

// function getAdvisor() {
//   const authStore = useAuthStore()
//   if (authStore.user !== null) {
//     AdvisorService.getAdvisorsById(authStore.user?.id)
//       .then((response) => {
//         ann.value.advisor = response.data
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }

function saveAnn() {
  var files = pond.value.getFiles()
  for (var i = 0; i < files.length; i++) {
    console.log(files[i].serverId.slice(9, -2))
    ann.value.files.push(files[i].serverId.slice(9, -2))
  }

  if (authStore.advisor !== null) {
    ann.value.advisor.id = authStore.advisor.id

    AnnService.saveAnnouncement(ann.value).then((res) => {
      status.value = true
      ann.value.title = ''
      ann.value.description = ''
      ann.value.files = []
      console.log(res.data)
      setTimeout(() => {
        status.value = false
      }, 2700)
    })
  }
}

function filesChange() {
  console.log('in filechange')

  var files = pond.value.getFiles()

  for (var i = 0; i < files.length; i++) {
    console.log(files[i].serverId.slice(9, -2))
  }
  console.log(ann.value.files)
}
</script>

<template>
  <div v-if="status" class="VStack items-center align-middle justify-center w-full h-full">
    <p class="text-white text-3xl mt-4">Done!</p>
  </div>
  <div
    v-if="!status"
    class="mb-[2rem] ml-0 mt-[108px] flex h-full w-full flex-col bg-se-dark text-xs md:text-base lg:ml-[17%] lg:mt-[60px] lg:w-[80%]"
  >
    <div>
      <form @submit.prevent="saveAnn">
        <div class="mx-auto w-[80%] lg:mx-auto">
          <!-- Header -->
          <label
            for="Title"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> Title </span>

            <BaseInput
              :required="true"
              v-model="ann.title"
              type="text"
              placeholder="Insert Title here"
              class="w-full px-3 py-2 mt-1 bg-transparent border-none text-se-white focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:mx-auto">
          <!-- INFO -->
          <label
            for="Info"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> Info </span>

            <textarea
              required
              v-model="ann.description"
              id="OrderNotes"
              class="w-full mt-2 align-top bg-transparent border-transparent border-none rounded-lg outline-none text-se-white ring-0 sm:text-sm"
              rows="4"
              placeholder="Enter any additional information notes..."
            ></textarea>
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:mx-auto">
          <label
            for="Upload"
            class="block px-3 py-2 mb-8 overflow-hidden border border-gray-200 rounded-md shadow-sm focus-within:border-blue-600 focus-within:ring-blue-600 bg-se-black1800 focus-within:ring-1"
          >
            <span class="text-xs font-medium text-se-gray-light"> File Upload </span>

            <file-pond
              class="mt-2"
              name="file"
              ref="pond"
              label-idle="Click this to upload or drop files here..."
              allow-multiple="true"
              :server="uploadUrl"
              :files="ann.files"
              allowRevert="false"
              allowFileSizeValidation="true"
              maxFileSize="1MB"
              labelMaxFileSizeExceeded="File is too large"
              v-on:init="handleFilePondInit"
              v-on:processfiles="filesChange"
            />
          </label>
        </div>

        <div class="mx-auto w-[80%] lg:mx-auto">
          <button
            class="flex items-center justify-between gap-4 px-5 py-3 transition-colors border border-current rounded-lg group bg-se-black1800 hover:bg-se-color focus:outline-none focus:ring active:bg-se-color-light"
            type="submit"
          >
            <span class="font-medium transition-colors text-se-white"> Submit </span>

            <span
              class="p-2 border border-indigo-600 rounded-full group-active:border-indigo-500 shrink-0 bg-se-black1800 text-se-white group-hover:bg-se-color"
            >
              <svg
                class="w-5 h-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
#commentForm {
  text-decoration: none;
  /* max-width: 500px; */
}
.text-primary,
input::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 1);
}
.secondary-button {
  border-radius: 10px;
  margin: 10px;
  /* style */

  background: var(--windows-glass, rgba(0, 0, 0, 0.3));

  background-blend-mode: luminosity;

  /* Blur */
  backdrop-filter: blur(50px);
}
.window-base {
  min-height: 300px;
}
</style>
