<template>
  <div>
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="rounded-lg shadow-sm p-2 mt-4"
    >
      <div class="VStack">
        <div class="HStack p-4">
          <img
            v-if="comment.author"
            :src="props.advisor.images[-1]"
            alt="Author Image"
            class="rounded-full w-16 h-16 object-cover"
          />
          <div class="VStack pl-4" >
            <p class="font-semibold text-lg">
              {{ props.advisor.name || 'Unknown Author' }}
            </p>
            <p class="pt-2 text-justify">{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { PropType} from 'vue'
import type {AdvisorItem, CommentItem} from '@/type' ;

const props = defineProps({
  comments: {
    type: Object as PropType<Array<CommentItem>>
  } ,// Specify the prop type as an array of Comment objects
  advisor: {
    required: true,
    type: Object as PropType<AdvisorItem>
  }
})

// const getAuthorName = (authorId: number): string | undefined => {
//   if (advisor) {
//     const author = advisorStore.advisors.find((advisor) => advisor.id === authorId)
//     return author ? `${author.name} ${author.surname}` : undefined
//   }
//   return undefined;
// }

// const getAuthorImage = (authorId: number): string | undefined => {
//   if (advisorStore.advisors) {
//     const author = advisorStore.advisors.find((advisor) => advisor.id === authorId)
//     return author ? author.image : undefined
//   }
//   return undefined;
// }
</script>
