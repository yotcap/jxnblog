import Vue from 'vue';
// import App from './App.vue';
import Entry from './views/Entrance.vue';
import router from './router/index';
import store from './store/index';
import './iview-components';
import '@/css/theme.less';
import '@/css/common.less';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(Entry),
}).$mount('#app');
