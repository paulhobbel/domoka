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
    EDIT (state, device) {
      const foundDevice = state.devices.find(item => item.id === device.id);

      foundDevice.name = device.name;
      foundDevice.location = device.location;
    },
    DELETE (state, id) {
      const index = state.devices.findIndex(item => item.id === id);
      if (index !== -1) {
        state.devices.splice(index, 1);
      }
    }
  },
  getters: {
    activeDevices: state => state.devices.filter(device => device.status)
  },
  actions: {
    async fetchAll ({ commit }) {
      commit('REQUEST');

      try {
        const { result } = await DeviceService.fetchAll();
        commit('SUCCESS', result);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    },

    async create ({ commit }, { deviceId, name, location, watt }) {
      try {
        const { device } = await DeviceService.create({ deviceId, name, location, watt });

        commit('ADD', device);
      } catch (err) {
        commit('FAILED', err.message);
      }
    },

    async edit ({ commit }, { id, deviceId, name, location, watt }) {
      try {
        const { device } = await DeviceService.edit({
          id,
          deviceId,
          name,
          location,
          watt
        });

        commit('EDIT', device);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    },

    async toggle ({ commit }, id) {
      try {
        const { device } = await DeviceService.toggle(id);

        commit('EDIT', device);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    },

    async delete ({ commit }, id) {
      try {
        await DeviceService.delete(id);

        commit('DELETE', id);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    }
  }
};
