import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vue-timer/',
    redirect: '/stop-watch'
  },
  {
    path: '/stop-watch',
    name: 'StopWatch',
    component: () => import( '../views/StopWatch.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
