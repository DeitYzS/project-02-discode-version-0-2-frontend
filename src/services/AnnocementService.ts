import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { AnnItem } from '@/type'
import apiClient from './AxiosClients'

export default {
  getAnnouncement(perPage: number, page: number): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>('/anns?_limit='+ perPage + '&_page='+ page)
  },
  getAnnouncementById(id: number): Promise<AxiosResponse<AnnItem>> {
    return apiClient.get<AnnItem>('anns/'+ id.toString())
  },
  saveAnnouncement (anns:AnnItem) : Promise<AxiosResponse<AnnItem>> {
    return apiClient.post<AnnItem>('/anns', anns)
  },
  getAnnouncementBy(): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>(`/anns`)
  },
  getAnnouncementByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AnnItem[]>> {
    return apiClient.get<AnnItem[]>('/anns?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  updateAnnouncement(id: number): Promise<AxiosResponse<AnnItem>> {
    return apiClient.put<AnnItem>('anns/'+ id.toString())
  },
}