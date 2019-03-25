import ApiService from './api.service';

export default {
  async login (username, password) {
    const res = await ApiService().post('/auth/login', {
      username, password
    });

    return res.data;
  },

  async fetchUser () {
    const res = await ApiService().get('/users/@me');

    return res.data;
  }
};
