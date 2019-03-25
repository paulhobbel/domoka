import ApiService from './api.service';

export default {
  async login (username, password) {
    return ApiService().post('/auth/login', {
      username, password
    });
  }
};
