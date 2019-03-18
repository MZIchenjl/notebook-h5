import Vue from 'vue'
import Router from 'vue-router'

import Pages from './pages'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Pages.Index
    },
    {
      path: '/home',
      component: Pages.Home
    },
    {
      path: '/note/-/:id',
      component: Pages.Note
    }
  ]
})
