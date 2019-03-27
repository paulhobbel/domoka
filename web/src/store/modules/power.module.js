import PowerService from '../../services/power.service';

export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    power: null
  },
  mutations: {
    REQUEST (state) {
      state.loading = true;
      state.error = null;
    },
    SUCCESS (state, power) {
      state.loading = false;
      state.power = power;
    },
    FAILED (state, message) {
      state.loading = false;
      state.error = message;
    }
  },
  actions: {
    async fetch ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await PowerService.fetch();
        commit('SUCCES', result);
      } catch (err) {
        console.log(err);
        commit('FAILED', err.message);
      }
    },

    async reset ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await PowerService.resetPower();
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        commit('FAILED', err.message);
      }
    }
  }
};
