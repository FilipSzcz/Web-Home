import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let store = '';
export default store = new Vuex.Store({
  state: {
    userData: '',
    token: null,
    user: null,
    isUserLoggedIn: false,
    userName: '',
    userId: '',
    filterMinPrice: false,
    filterMaxPrice: false,
    filterMinSurface: false,
    filterMaxSurface: false,
    filterCity: false,
    filterDistrict: false
  },
  mutation: {
    setToken(state, token) {
      state.token = token
    }
  },
  actions: {
    setToken({
      commit
    }, token) {
      commit('setToken', token)
    }
  }
})
