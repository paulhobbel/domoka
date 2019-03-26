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
  },

  async changeName (username, oldPassword, newPassword) {
    const res = await ApiService().patch('/users/@me', {
      username, oldPassword, newPassword
    });

    return res.data;
  }
};
