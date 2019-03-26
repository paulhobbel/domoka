import PowerService from '../../services/power.service';

export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    powerUsage: '',
    powerUsed: '',
    powerSavings: ''
  },
  mutations: {
    REQUEST (state) {
      state.loading = true;
      state.error = null;
    },
    SUCCESS (state, power) {
      state.loading = false;
      state.powerUsage = power.powerUsage;
      state.powerUsed = power.powerUsed;
      state.powerSavings = power.powerSavings;
    },
    FAILED (state, message) {
      state.loading = false;
      state.error = message;
    }
  },
  actions: {
    async getPower ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await PowerService.getPower();
        commit('SUCCESS', result);
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
