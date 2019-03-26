import ApiService from './api.service';

export default {
  async fetch () {
    const res = await ApiService().get('/power');

    return res.data;
  },

  async resetPower () {
    const res = await ApiService().post();

    return res.data;
  }
};
