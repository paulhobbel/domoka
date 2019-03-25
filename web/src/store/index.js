import Vue from 'vue';
import Vuex from 'vuex';

import AuthModule from './modules/auth.module';
import DeviceModule from './modules/device.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    devices: DeviceModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
});
