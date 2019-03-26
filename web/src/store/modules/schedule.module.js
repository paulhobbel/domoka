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
      state.schedules.push(schedule);
    },
    EDIT (state, schedule) {
      const found = state.schedules.find(item => item.id === schedule.id);

      found.name = schedule.name;
      found.description = schedule.description;
      found.beginTime = schedule.beginTime;
      found.endTime = schedule.endTime;
      found.devices = schedule.devices || [];
    },
    REMOVE (state, id) {
      const index = state.schedules.findIndex(item => item.id === id);
      if (index !== -1) {
        state.schedules.splice(index, 1);
      }
    }
  },
  actions: {
    async fetchAll ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await ScheduleService.fetchAll();
        commit('SUCCESS', result);
      } catch (err) {
        commit('FAILED', err);
        throw err;
        // commit('FAILED', err.response.data.message);
      }
    },
    async create ({ commit }, { name, description, devices, beginTime, endTime }) {
      try {
        const { schedule } = await ScheduleService.create({ name, description, devices, beginTime, endTime });

        commit('ADD', schedule);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
        // console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async edit ({ commit }, { id, name, description, devices, beginTime, endTime }) {
      try {
        const { schedule } = await ScheduleService.edit({ id, name, description, devices, beginTime, endTime });

        commit('EDIT', schedule);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
        // console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },

    async toggle ({ commit }, id) {
      try {
        const { schedule } = await ScheduleService.toggle(id);

        commit('EDIT', schedule);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    },

    async delete ({ commit }, id) {
      commit('REQUEST');

      try {
        await ScheduleService.delete(id);
        commit('REMOVE', id);
      } catch (err) {
        console.log(err);
        throw err;
        // commit('FAILED', err.response.data.message);
      }
    },
    async fetchOne ({ commit }, { id }) {
      commit('REQUEST');

      try {
        const { result } = await ScheduleService.getschedules(id);
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    }
  }
};
