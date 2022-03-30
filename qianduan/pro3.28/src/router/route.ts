import { AnyFunction } from 'element-plus/es/utils/types'
import { RouteRecordRaw } from 'vue-router'
import { Store } from '../stores'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/userLogin'
  },
  {
    path: '/UserLogin',
    component: () => import('@/components/views/UserLogin.vue'),
  },
  {
    path: '/index',
    component: () => import('@/components/views/index.vue'),
    redirect: '/PersonCenter',

    children: [
      {
        path: '/PersonCenter',
        component: () => import('@/components/views/PersonCenter.vue')
      },
      {
        path: '/Backlog',
        component: () => import('@/components/views/TheBacklog.vue')
      },
      {
        path: '/Projects',
        component: () => import('@/components/views/TheProjects.vue')
      },
      {
        path: '/projectInfo',
        name: 'projectInfo',
        component: () => import('@/components/views/TheProjectInfo.vue')
      },
      {
        path: '/MyGroups',
        name: '/MyGroups',
        component: () => import('@/components/views/TheGroups.vue')
      },
      {
        path: '/groupInfo',
        name: 'groupInfo',
        component: () => import('@/components/views/TheGroupInfo.vue')
      },
      {
        path: '/TaskManage',
        component: () => import('@/components/views/TheTaskManage.vue'),
        beforeEnter: (to, from) => {
          const store = Store()
          // store.showSideOperationFlag = true
        }
      },
      {
        path: '/Members',
        component: () => import('@/components/views/TheMembers.vue')
      },
      {
        path: '/UserInfo',
        component: () => import('@/components/views/ThePersonal.vue')
      },
      {
        path: '/Checks',
        name: 'Checks',
        component: () => import('@/components/views/TheChecks.vue')
      },
      {
        path: '/checkReport',
        name: 'checkReport',
        component: () => import('@/components/views/TheCheckReport.vue')
      },
      {
        path: '/test',
        component: () => import('@/components/layout/tasks/TaskCard.vue')
      },
      {
        path: '/CardTask',
        component: () => import('@/components/layout/backlog/CardTask.vue')
      }
    ]
  }
]

export default routes
