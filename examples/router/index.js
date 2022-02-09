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
    redirect: '/component/demo',
    component: () => import(/* webpackChunkName: "about" */ '../views/component.vue'),
    children: [
      { path: '/component/demo', name: 'Demo', component: () => import('../docs/demo.md') },
      { path: '/component/table', name: 'Table', component: () => import('../docs/table.md') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
