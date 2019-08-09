import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowMenuIcon: false,
  },
  mutations: {
    onResize(state) {
      state.isShowMenuIcon = (window.innerWidth < 576);
    },
  },
  actions: {

  },
});
