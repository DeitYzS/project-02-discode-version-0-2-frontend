import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentItem } from '@/type'
import apiClient from './AxiosClients'

export default {
  getStudent(perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/students?_limit='+ perPage + '&_page='+ page)
  },
  getStudentById(id: number): Promise<AxiosResponse<StudentItem>> {
    return apiClient.get<StudentItem>('students/'+ id.toString())
  },
  saveStudent (student:StudentItem) : Promise<AxiosResponse<StudentItem>> {
    return apiClient.post<StudentItem>('/students', student)
  },
  getStudentByKeyword(keyword: string, perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    return apiClient.get<StudentItem[]>('/students?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
 
updateStudent(id: number, updatedProperties: any): Promise<AxiosResponse<StudentItem>> {
  return apiClient.put<StudentItem>('/students/' + id, updatedProperties);
}


  
 
}