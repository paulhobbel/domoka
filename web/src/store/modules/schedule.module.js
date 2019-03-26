import ScheduleService from '../../services/schedule.service';

export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    schedules: []
  },
  mutations: {
    REQUEST (state) {
      state.loading = true;
      state.error = null;
    },
    SUCCESS (state, schedules) {
      state.loading = false;
      state.schedules = schedules;
    },
    FAILED (state, message) {
      state.loading = false;
      state.error = message;
    },
    ADD (state, schedule) {
      state.schedule.push(schedule);
    },
    EDIT (state, { schedule, name = schedule.name, description = schedule.description, beginTime = schedule.beginTime, endTime = schedule.endTime, devices }) {
      schedule.name = name;
      schedule.description = description;
      schedule.beginTime = beginTime;
      schedule.endTime = endTime;
      schedule.devices = devices;
    },
    REMOVE (state, schedule) {
      state.schedules.splice(state.schedules.indexOf(schedule), 1);
    }
  },
  actions: {
    async fetchALl ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await ScheduleService.getschedules();
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async edit ({ commit }, { name, description, devices, beginTime, endTime }) {
      try {
        const schedule = await ScheduleService.create({ name, description, devices, beginTime, endTime });

        commit('ADD', schedule);
      } catch (err) {
        commit('FAILED', err.message);
        // console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async delete ({ commit }, schedule) {
      commit('REQUEST');

      try {
        await ScheduleService.deleteSchedule(schedule.id);
        commit('REMOVE', schedule);
      } catch (err) {
        console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async create ({ commit }, { name, description, devices, beginTime, endTime }) {
      try {
        const schedule = await ScheduleService.create({ name, description, devices, beginTime, endTime });

        commit('ADD', schedule);
      } catch (err) {
        commit('FAILED', err.message);
        // console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async fetchOne ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await ScheduleService.getschedules();
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    }
  }
};
