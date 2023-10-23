import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AnnItem } from '@/type'
import apiClient from './AxiosClients'

export default {
  getComment(perPage: number, page: number): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>('/anns?_limit='+ perPage + '&_page='+ page)
  },
  getCommentById(id: number): Promise<AxiosResponse<AnnItem>> {
    return apiClient.get<AnnItem>('anns/'+ id.toString())
  },
  saveComment (anns:AnnItem) : Promise<AxiosResponse<AnnItem>> {
    return apiClient.post<AnnItem>('/anns', anns)
  },
  getCommentBy(): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>(`/anns`)
  },
  getCommentByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>('/anns?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  updateComment(id: number): Promise<AxiosResponse<AnnItem>> {
    return apiClient.put<AnnItem>('anns/'+ id.toString())
  },
}