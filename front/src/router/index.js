import Vue from 'vue'
import Router from 'vue-router'
import NewUser from '@/views/NewUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NewUser',
		  component: NewUser
    }
  ]
})
