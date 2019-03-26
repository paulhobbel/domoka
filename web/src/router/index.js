import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Devices from '@/views/Devices.vue';
import Schedule from '@/views/Schedule.vue';
import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';

import { AuthGuard } from './guards';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: AuthGuard,
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/devices',
      name: 'devices',
      beforeEnter: AuthGuard,
      component: Devices
    },
    {
      path: '/schedule',
      name: 'schedule',
      beforeEnter: AuthGuard,
      component: Schedule
    },
    {
      path: '/settings',
      name: 'settings',
      beforeEnter: AuthGuard,
      component: Settings
    },
    {
      path: '/profile',
      name: 'profile',
      beforeEnter: AuthGuard,
      component: Profile
    }

  ]
});
