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
      { path: '/component/search', name: 'Search', component: () => import('../docs/search.md') },
      { path: '/component/import', name: 'Import', component: () => import('../docs/import.md') },
      { path: '/component/upload', name: 'Upload', component: () => import('../docs/upload.md') },
      { path: '/component/city', name: 'City', component: () => import('../docs/city.md') },
      { path: '/component/footer', name: 'Footer', component: () => import('../docs/footer.md') },
      { path: '/component/tip', name: 'Tip', component: () => import('../docs/tip.md') },
    ]
  },
  {
    path: '/component',
    name: 'ComponentTool',
    redirect: '/component/tool',
    component: () => import(/* webpackChunkName: "about" */ '../views/component.vue'),
    children: [
      { path: '/component/tool', name: 'Tool', component: () => import('../docs/tool.md') },
      { path: '/component/reg', name: 'Reg', component: () => import('../docs/reg.md') },
      { path: '/component/format', name: 'Format', component: () => import('../docs/format.md') },
      { path: '/component/code', name: 'Code', component: () => import('../docs/code.md') },
      { path: '/component/more', name: 'More', component: () => import('../docs/more.md') },
    ]
  },
  {
    path: '/css',
    name: 'Css',
    redirect: '/component/css',
    component: () => import(/* webpackChunkName: "about" */ '../views/component.vue'),
    children: [
      { path: '/component/css', name: 'CssClass', component: () => import('../docs/css.md') },
    ]
  },
  {
    path: '/other',
    name: 'Other',
    redirect: '/other/other',
    component: () => import(/* webpackChunkName: "about" */ '../views/other.vue'),
    children: [
      { path: '/other/other', name: 'Othermd', component: () => import('../docs/other.md') },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
