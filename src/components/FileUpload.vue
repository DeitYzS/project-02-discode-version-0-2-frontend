<script setup lang="ts">
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview)
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_FILE_URL)
function handleFilePondInit() {
  console.log('FilePond has initialized')
}
const pond = ref()

</script>

<template>
    <Uploader class="bg-transparent" :server="uploadUrl" @change="onChanged" :media="media" max="1"></Uploader>
</template>
