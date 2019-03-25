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
    },
    ADD (state, device) {
      state.devices.push(device);
    },
    EDIT (state, { device, name = device.name, location = device.location, status = device.status }) {
      device.name = name;
      device.location = location;
      device.status = status;
    },
    REMOVE (state, device) {
      state.devices.splice(state.devices.indexOf(device), 1);
    }
  },
  actions: {
    async fetchAll ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await DeviceService.fetchAll();
        commit('SUCCESS', result);
      } catch (err) {
        console.log(err);
        commit('FAILED', err.response.data.message);
      }
    },

    async create ({ commit }, { name, location }) {
      try {
        const device = await DeviceService.create({ name, location });

        commit('ADD', device);
      } catch (err) {
        commit('FAILED', err.message);
      }
    },

    async edit ({ commit }, device) {

    },

    async delete ({ commit }, device) {
      try {
        await DeviceService.delete(device.id);

        commit('REMOVE', device);
      } catch (err) {
        console.log(err);
        commit('FAILED', err.message);
      }
    }
  }
};
