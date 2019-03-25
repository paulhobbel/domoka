import AuthService from '../../services/auth.service';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || null,
    username: null,
    error: null
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token;
    },
    SET_USERNAME (state, username) {
      state.username = username;
    },
    SET_ERROR (state, message) {
      state.token = null;
      state.username = null;
      state.error = message;
    },
    CLEAR_ERROR (state) {
      state.error = null;
    },
    CLEAR_TOKEN (state) {
      state.token = null;
    },
    CLEAR_USERNAME (state) {
      state.username = null;
    }
  },
  actions: {
    async login ({ commit }, { username, password }) {
      commit('CLEAR_ERROR');
      try {
        const { data } = await AuthService.login(username, password);

        localStorage.setItem('token', data.token);
        commit('SET_TOKEN', data.token);
        commit('SET_USERNAME', data.user.username);
      } catch (err) {
        // console.log(err.response.data.message);
        localStorage.removeItem('token');
        commit('SET_ERROR', err.response.data.message);
      }
    },
    logout ({ commit }) {
      commit('CLEAR_TOKEN');
      commit('CLEAR_USERNAME');
    }
  },
  getters: {
    isLoggedIn: state => state.token != null && state.username != null
  }
};
