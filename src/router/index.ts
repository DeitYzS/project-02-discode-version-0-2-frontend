import { createRouter, createWebHistory } from 'vue-router'
import UserListView from '@/views/UserListView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkView from '@/views/NetworkView.vue'
import StudentLayoutView from '@/views/Student/StudentLayoutView.vue'
import { useStudentStore } from '@/stores/student'
import NProgress from 'nprogress'
import StudentService from '@/services/StudentService'
import AdvisorService from '@/services/AdvisorService'
import AdvisorLayout from '@/views/Advisor/AdvisorLayoutView.vue'
import { useAdvisorStore } from '@/stores/advisor'
import StudentDetailView from '@/views/Student/StudentDetailView.vue'
import AdvisorDetailView from '@/views/Advisor/AdvisorDetailView.vue'
import HomeView from '@/views/HomeView.vue'
import StudentCommentView from '@/views/Student/StudentCommentView.vue'
import AdvisorListView from '@/views/AdvisorListView.vue'
import StudentListView from '@/views/StudentListView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import StudentFormView from '@/views/Add/StudentFormView.vue'
import AdvisorFormView from '@/views/Add/AdvisorFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home-view',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/userlist',
      name: 'user-list',
      component: UserListView,
      // props: (route) => ({page: parseInt(route.query?.page as string || '1')}),
      children: [
        {
          path: '',
          name: 'student-list',
          component: StudentListView,
          props: (route) => ({page: parseInt(route.query?.page as  string || '1')})

        },
        {
          path: '',
          name: 'advisor-list',
          component: AdvisorListView,
          props: (route) => ({page: parseInt(route.query?.page as  string || '1')})
        },
        {
          path: '',
          name: 'add-student',
          component: StudentFormView
        },
        {
          path: '',
          name: 'add-advisor',
          component: AdvisorFormView
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,

    },
    {
      path: '/student/:id',
      name: 'student-layout',
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        return StudentService.getStudentById(id)
          .then((res) => {
            // need to set up the data for the component
            studentStore.setStudent(res.data)
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'student' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      component: StudentLayoutView,
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },{
          path: '',
          name: 'student-comment',
          component: StudentCommentView,
          props: true
        }
      ]
    },
    
    {
    path:'/advisor/:id',
    name: 'advisor-layout',
    props:true,
    beforeEnter: (to) => {
      const advisorStore = useAdvisorStore();
      const id: number = parseInt(to.params.id as string)
      return AdvisorService.getAdvisorById(id)
      .then((response) => {
        advisorStore.setAdvisor(response.data)
      }).catch((error) =>{
        if(error.response && error.response.status === 404){
          return {
            name: '404-resourse',
            params: { resoures: 'advisor'}
          }
        }else{
          return {name: 'network-error'}
        }
      })
    },
    component: AdvisorLayout,
    children: [
      {
        path: '',
        name: 'advisor-detail',
        component: AdvisorDetailView,
        props:true
      },
    ]
    },

    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: '/not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkView
    }
  ],
  scrollBehavior(ro, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
