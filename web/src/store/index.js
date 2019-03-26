import Vue from 'vue';
import Vuex from 'vuex';

import AuthModule from './modules/auth.module';
import DeviceModule from './modules/device.module';
import ScheduleModule from './modules/schedule.module';
import PowerModule from './modules/power.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
    devices: DeviceModule,
    schedule: ScheduleModule,
    power: PowerModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
});
