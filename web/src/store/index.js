import Vue from 'vue';
import Vuex from 'vuex';

import AuthModule from './modules/auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule
  },
  state: {

  },
  mutations: {

  },
  actions: {

  }
});
