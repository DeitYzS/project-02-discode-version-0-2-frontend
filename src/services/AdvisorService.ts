import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AdvisorItem } from '@/type'
import apiClient from './AxiosClients'

export default {
  getAdvisor(perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>('/advisors?_limit='+ perPage + '&_page='+ page)
  },
  getAdvisorById(id: number): Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.get<AdvisorItem>('advisors/'+ id.toString())
  },
  saveAdvisor (advisor:AdvisorItem) : Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.post<AdvisorItem>('/advisors', advisor)
  },
  getAdvisorBy(): Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>(`/advisors`)
  },
  getAdvisorByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>('/advisors?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)

  }
}