import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AdvisorItem, StudentItem } from '@/type'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


export default {
  getAdvisor(perPage: number, page: number): Promise<AxiosResponse<AdvisorItem[]>> {
    return apiClient.get<AdvisorItem[]>('/advisors?_limit='+ perPage + '&_page='+ page)
  },
  getAdvisorById(id: number): Promise<AxiosResponse<AdvisorItem>> {
    return apiClient.get<AdvisorItem>('advisors/'+ id.toString())
  }
}