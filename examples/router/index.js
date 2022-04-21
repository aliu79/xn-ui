import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/component',
    name: 'Component',
    redirect: '/component/table',
    component: () => import(/* webpackChunkName: "about" */ '../views/component.vue'),
    children: [
      { path: '/component/table', name: 'Table', component: () => import('../docs/table.md') },
      { path: '/component/tip', name: 'Tip', component: () => import('../docs/tip.md') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
