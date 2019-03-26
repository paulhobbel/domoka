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
        const { device } = await DeviceService.create({ name, location });

        commit('ADD', device);
      } catch (err) {
        commit('FAILED', err.message);
      }
    },

    async edit ({ commit }, { id, name, location }) {
      try {
        const { device } = await DeviceService.edit({
          id,
          name,
          location
        });

        console.log(device);

        commit('EDIT', device);
      } catch (err) {
        commit('FAILED', err.message);
        throw err;
      }
    },

    async toggle ({ commit }, id) {
      try {
        const { device } = await DeviceService.toggle(id);

        commit('SUCCES', device);
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
        console.log(err);
        commit('FAILED', err.message);
      }
    }
  }
};
