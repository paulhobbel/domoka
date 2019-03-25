import ApiService from './api.service';

export default {
  async fetch () {
    const res = await ApiService().get('/devices');

    return res.data;
  },

  async edit ({ id, ...device }) {
    const res = await ApiService().patch(`/devices/${id}`, device);

    return res.data;
  }
};
