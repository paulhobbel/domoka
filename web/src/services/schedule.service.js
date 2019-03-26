import ApiService from './api.service';

export default {
  async editSchedule (id, schedule) {
    const res = await ApiService().patch(`/schedules/${id}`, {
      schedule
    });

    return res.data;
  },

  async getschedules () {
    const res = await ApiService().get('/schedules');

    return res.data;
  },

  async getschedule () {
    const res = await ApiService().get(`/schedules/${id}`);

    return res.data;
  },

  async createSchedule (schedule) {
    const res = await ApiService().post('/schedules', {
      schedule
    });

    return res.data;
  },

  async deleteSchedule (id) {
    const res = await ApiService().delete(`/schedules/${id}`);

    return res.data;
  }
};
