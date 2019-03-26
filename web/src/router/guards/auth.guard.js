import store from '@/store';

export default async (to, from, next) => {
  const loggedIn = store.getters['auth/isLoggedIn'];

  if (!loggedIn) {
    return next({ name: 'login', query: { redirect: to.path } });
  }

  if (loggedIn && !store.state['auth/username']) {
    await store.dispatch('auth/fetchUser');
  }

  store.watch(() => store.getters['auth/isLoggedIn'], loggedIn => {
    if (!loggedIn) {
      return next({ name: 'login', query: { redirect: to.path } });
    }
  });

  return next();
};
