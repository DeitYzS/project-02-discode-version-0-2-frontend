import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { StudentItem } from '@/type'

const apiClientStudent: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3004',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})


export default {
  getStudent(perPage: number, page: number): Promise<AxiosResponse<StudentItem[]>> {
    return apiClientStudent.get<StudentItem[]>('/students?_limit='+ perPage + '&_page='+ page)
  },
  getStudentById(id: number): Promise<AxiosResponse<StudentItem>> {
    return apiClientStudent.get<StudentItem>('students/'+ id.toString())
  }
}