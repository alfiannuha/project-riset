import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/voice',
    name: 'Voice',
    component: Home
  },
  {
    path: '/face',
    name: 'Face',
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
