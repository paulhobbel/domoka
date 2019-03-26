import ApiService from './api.service';

export default {
  async fetchAll () {
    const res = await ApiService().get('/schedules');

    return res.data;
  },

  async create ({ name, description, status, beginTime, endTime }) {
    const res = await ApiService().post('/schedules', {
      name, description, status, beginTime, endTime
    });

    return res.data;
  },

  async edit ({ id, ...schedule }) {
    const res = await ApiService().patch(`/schedules/${id}`, {
      schedule
    });

    return res.data;
  },

  async delete (id) {
    const res = await ApiService().delete(`/schedules/${id}`);

    return res.data;
  },

  async getschedule (id) {
    const res = await ApiService().get(`/schedules/${id}`);

    return res.data;
  }
};
