import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    flagShowMenuIcon: false,    // menu icon
    flagShowDrawer: false,    // Drawer
  },
  mutations: {
    onResize (state) {
      state.flagShowMenuIcon = (window.innerWidth < 576);
    },
    handleDrawerShow (state, opt) {
      state.flagShowDrawer = opt;
    },
  },
  actions: {
  },
});
