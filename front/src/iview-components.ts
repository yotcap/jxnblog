import Vue from 'vue';
import {
  Button,
  Layout,
  Row,
  Col,
  Sider,
  Drawer,
  Page,
  Message,
} from 'iview';

Vue.component('Button', Button);
Vue.component('Layout', Layout);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Sider', Sider);
Vue.component('Drawer', Drawer);
Vue.component('Page', Page);

Vue.prototype.$Message = Message;
