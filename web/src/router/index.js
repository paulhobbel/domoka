import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Devices from '@/views/Devices.vue';
import Schedule from '@/views/Schedule.vue';
import Settings from '@/views/Settings.vue';

import { MetaGuard } from './guards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: Schedule,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(MetaGuard);

store.watch(
  (state, getters) => getters['auth/isLoggedIn'],
  (loggedIn) => {
    if (!loggedIn && router.currentRoute.matched.some(record => record.meta.requiresAuth)) {
      router.push({ name: 'login', query: { redirect: router.currentRoute.path } });
    }
  }
);

export default router;
