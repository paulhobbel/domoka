import axios from 'axios';
import store from '@/store';

export default () => {
  const http = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
      ...(store.getters['auth/getBearerToken'] && { Authorization: `Bearer ${store.getters['auth/getBearerToken']}` })
    }
  });

  http.interceptors.response.use(undefined, async (err) => {
    // return new Promise(function (resolve, reject) {
    console.log('Hi There', err.response.status);
    if (err.response.status === 401) {
      console.log('Test');
      store.dispatch('auth/logout');
    }
    throw err;
    // });
  });

  return http;
};
