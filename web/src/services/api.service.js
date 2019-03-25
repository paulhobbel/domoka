import axios from 'axios';
import store from '../store';

console.log(process.env.VUE_APP_BACKEND_URL);

export default () => axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    ...(store.getters['auth/getBearerToken'] && { Authorization: `Bearer ${store.getters['auth/getBearerToken']}` })
  }
});
