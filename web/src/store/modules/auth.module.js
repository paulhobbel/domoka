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
        const { token, user } = await AuthService.login(username, password);

        localStorage.setItem('token', token);
        commit('SET_TOKEN', token);
        commit('SET_USERNAME', user.username);
      } catch (err) {
        // console.log(err.response.data.message);
        localStorage.removeItem('token');
        commit('SET_ERROR', err.response.data.message);
      }
    },
    async changeName ({ commit }, { username, oldPassword, newPassword }) {
      commit('CLEAR_ERROR');
      try {
        const { user } = await AuthService.changeName(username, oldPassword, newPassword);
        commit('SET_USERNAME', user.username);
      } catch (err) {
        commit('SET_ERROR', err.response.data.message);
      }
    },
    async fetchUser ({ commit, state }) {
      if (!state.token) {
        return false; // TODO: Throw an auth error
      }

      const { user } = await AuthService.fetchUser();

      commit('SET_USERNAME', user.username);
    },
    logout ({ commit }) {
      localStorage.removeItem('token');
      commit('CLEAR_TOKEN');
      commit('CLEAR_USERNAME');
      commit('CLEAR_ERROR');
    }
  },
  getters: {
    isLoggedIn: state => state.token != null,
    getBearerToken: state => state.token
  }
};
