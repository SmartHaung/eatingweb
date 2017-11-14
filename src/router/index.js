import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import CallQueue from '@/components/CallQueue'
import MyBusiness from '@/components/MyBusiness'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/mybusiness',
    name: 'MyBusiness',
    component: MyBusiness
  },
  {
    path: '/callqueue/:businessInfoId/:businessInfoUniqueId',
    name: 'CallQueue',
    component: CallQueue
  }]
})
