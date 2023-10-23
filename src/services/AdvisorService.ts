import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AdvisorItem, StudentItem } from '@/type'
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
  },
  updateStudent(id: number): Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.put<AdvisorItem>('advisors/'+ id.toString())
  },
  updateAdvisor(id: number, updatedProperties: any): Promise<AxiosResponse<StudentItem>> {
    return apiClient.put<StudentItem>('/advisors/' + id, updatedProperties);
  }
 
}