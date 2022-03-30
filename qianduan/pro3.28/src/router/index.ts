import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './route'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr && to.path !== '/UserLogin') {
    next('/UserLogin')
  } else {
    next()
  }
})
export default router
