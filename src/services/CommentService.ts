import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { CommentItem } from '@/type'
import apiClient from './AxiosClients'

export default {
  getComment(perPage: number, page: number): Promise<AxiosResponse<CommentItem[]>> {
    return apiClient.get<CommentItem[]>('/comments?_limit='+ perPage + '&_page='+ page)
  },
  getCommentById(id: number): Promise<AxiosResponse<CommentItem>> {
    return apiClient.get<CommentItem>('comments/'+ id.toString())
  },
  saveComment (advisor:CommentItem) : Promise<AxiosResponse<CommentItem>> {
    return apiClient.post<CommentItem>('/comments', advisor)
  },
  getCommentBy(): Promise<AxiosResponse<CommentItem[]>> {
    return apiClient.get<CommentItem[]>(`/comments`)
  },
  getCommentByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<CommentItem[]>> {
    return apiClient.get<CommentItem[]>('/comments?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  updateComment(id: number): Promise<AxiosResponse<CommentItem>> {
    return apiClient.put<CommentItem>('comments/'+ id.toString())
  },
}