import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';

import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Devices from '@/views/Devices.vue';
import Schedule from '@/views/Schedule.vue';
// import Settings from '@/views/Settings.vue';
import Profile from '@/views/Profile.vue';

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
        requiresAuth: true,
        title: 'Home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/devices',
      name: 'devices',
      component: Devices,
      meta: {
        requiresAuth: true,
        title: 'Devices'
      }
    },
    {
      path: '/schedules',
      name: 'schedules',
      component: Schedule,
      meta: {
        requiresAuth: true,
        title: 'Schedules'
      }
    },
    // {
    //   path: '/settings',
    //   name: 'settings',
    //   component: Settings,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true,
        title: 'Profile'
      }
    }
  ]
});

router.beforeEach(MetaGuard);
router.afterEach((to, from) => {
  const pageTitle = to.meta.title;

  if (pageTitle) {
    document.title = `Domoca - ${pageTitle}`;
  } else {
    document.title = 'Domoca';
  }
});

store.watch(
  (state, getters) => getters['auth/isLoggedIn'],
  (loggedIn) => {
    if (!loggedIn && router.currentRoute.matched.some(record => record.meta.requiresAuth)) {
      router.push({ name: 'login', query: { redirect: router.currentRoute.path } });
    }
  }
);

export default router;
