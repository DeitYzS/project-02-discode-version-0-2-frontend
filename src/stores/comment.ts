import type { CommentItem } from "@/type";
import { defineStore } from "pinia";

export const useCommentStore = defineStore('comment', {
    state: () => ({
        comments: [] as CommentItem[]
    }),
    actions: {
        setComments(comments: CommentItem[]) {
            this.comments = comments
        },
        addComment(comment: CommentItem) {
            this.comments.push(comment)
        }
    }
})
