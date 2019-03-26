import store from '@/store';

export default async (to, from, next) => {
  const loggedIn = store.getters['auth/isLoggedIn'];
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log('[MetaGuard]: To:', to);

  if (!loggedIn && requiresAuth) {
    return next({
      name: 'login',
      query: { redirect: to.path }
    });
  }

  if (loggedIn && !store.state['auth/username']) {
    try {
      await store.dispatch('auth/fetchUser');
    } catch (err) {
      return next({
        name: 'login',
        query: { redirect: to.path }
      });
    }
  }

  if (loggedIn && to.name === 'login') {
    return next('/');
  }

  return next();
};
