import ApiService from './api.service';

export default {
  async fetchAll () {
    const res = await ApiService().get('/devices');

    return res.data;
  },

  async create ({ name, location }) {
    const res = await ApiService().post('/devices', { name, location });

    return res.data;
  },

  async edit ({ id, ...device }) {
    const res = await ApiService().patch(`/devices/${id}`, device);

    return res.data;
  },

  async delete (id) {
    const res = await ApiService().delete(`/devices/${id}`);

    return res.data;
  }
};