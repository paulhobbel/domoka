import axios from 'axios';
import store from '@/store';

export default () => {
  return axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    headers: {
      ...(store.getters['auth/getBearerToken'] && { Authorization: `Bearer ${store.getters['auth/getBearerToken']}` })
    }
  });
};
