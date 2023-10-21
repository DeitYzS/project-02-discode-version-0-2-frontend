import { defineStore } from "pinia";
import axios from "axios";
import type { AxiosInstance } from "axios";
import type { AdvisorItem, StudentItem } from "@/type";
import { remove } from "nprogress";

const apiClient: AxiosInstance = axios.create ({
    baseURL: import.meta.env.VITE_BACKEND_URL ,
    withCredentials: false ,
    headers: {
        Accept: 'application/json' ,
        'Content-Type': 'application/json'
    }
})

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: null as string | null ,
    student: null as StudentItem | null ,
    advisor: null as AdvisorItem | null
 }),

 getters: {
    currentUserName() : string {
        return this.student?.name || this.student?.name || ''
    },
    isAdmin() :boolean {
        return this.student?.roles.includes('ROLE_ADMIN')  || this.advisor?.roles.includes('ROLE_ADVISOR') || false
    }

 },

 actions: {
    login(email: string, password: string) {
        return apiClient
            .post('/api/v1/auth/authenticate', {
                username: email,
                password: password
            })
            .then((res) => {
                this.token = res.data.access_token
                this.student = res.data.student
                localStorage.setItem('access_token', this.token as string)
                localStorage.setItem('student', JSON.stringify(this.student))
                axios.defaults.headers.common['Authorization'] = 'Bearer'+ this.token
                return res
            })
    },

    logout() {
        console.log('logout')
        this.token = null 
        this.student = null 
        localStorage.removeItem('student')
        localStorage.removeItem('access_token')
    },

    reload(token: string, student: StudentItem) {
        this.token = token
        this.student = student
    },
    
    register(
        email: string,
        password: string,
        username: string,
        firstname: string,
        lastname: string
      ) {
        return apiClient
          .post('/api/v1/auth/register', {
            username,
            email,
            password,
            firstname,
            lastname
          })
          .then((res) => {
            this.token = res.data.access_token
            console.log(res.data.user)
            this.student = {
                id: res.data.user.id,
                name: res.data.user.name,
                address: res.data.user.address,
                images: res.data.user.images,
                roles: res.data.user.roles
            } as unknown as StudentItem
            localStorage.setItem('access_token', this.token as string)
            localStorage.setItem('student', JSON.stringify(this.student))
            return res
          })
      }
    }
 }
)