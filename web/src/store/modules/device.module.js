import DeviceService from '../../services/device.service';

export default {
  namespaced: true,
  state: {
    loading: false,
    error: null,
    devices: []
  },
  mutations: {
    REQUEST (state) {
      state.loading = true;
      state.error = null;
    },
    SUCCESS (state, devices) {
      state.loading = false;
      state.devices = devices;
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
        const { result } = await DeviceService.fetch();
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        // commit('FAILED', err.response.data.message);
      }
    },
    async edit ({ commit }, device) {

    },
    async delete ({ commit }, id) {

    }
  }
};
