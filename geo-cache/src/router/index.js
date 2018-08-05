import Vue from 'vue'
import Router from 'vue-router'
import Gmap from '@/components/home/Gmap'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import ViewProfile from '@/components/profile/ViewProfile'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({

  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Gmap',
      component: Gmap, 
      meta: {
        requresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile/:id',
      name: 'ViewProfile',
      component: ViewProfile,
      meta: {
        requresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // check to see if route requres Auth
  if(to.matched.some(rec => rec.meta.requresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if(user){
      // user is signed in, proceed to route
      next()
    } else {
      // no user signed in, redirect to login
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router