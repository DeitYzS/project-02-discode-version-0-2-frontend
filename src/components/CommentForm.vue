<template>
  <form id="commentForm" class="bg-white rounded-lg shadow-sm p-2 mt-4">
    <div class="VStack relative">
      <textarea class="bg-gray-200 h-36 rounded-md" v-model="newCommentText"></textarea>
      <div class="HStack absolute bottom-0 right-0">
        <input class="button ocean-blue w-fit p-2 rounded-md m-2" type="button" value="Post" @click="submitComment" />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit= defineEmits(["add-comment"])

const newCommentText = ref('');

const props = defineProps( {
  newId: {
    required:true,
    type: Number
  }
})

const submitComment = () => {
  if (!newCommentText.value.trim()) {
    alert('Please fill in the comment.');
    return;
  }

  // Simulate adding the new comment to the student's comments array
  const newComment = {
    id: props.newId.valueOf() , // Generate a new ID
    text: newCommentText.value,
    author: "1", // Assuming "1" is the author's ID
  };

  // console.log(newComment.text);
  emit('add-comment', newComment);
  // student.comments.push(newComment);

  // Clear the textarea after submitting
  newCommentText.value = '';
};



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
</style>
