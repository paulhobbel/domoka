import ApiService from './api.service';

export default {
  async fetchAll () {
    const res = await ApiService().get('/devices');

    return res.data;
  },

  async create (device) {
    const res = await ApiService().post('/devices', device);

    return res.data;
  },

  async toggle (id) {
    const res = await ApiService().post(`/devices/${id}/toggle`);

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
