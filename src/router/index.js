import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CallQueue from '@/components/CallQueue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/callqueue',
    name: 'CallQueue',
    component: CallQueue
  }]
})
