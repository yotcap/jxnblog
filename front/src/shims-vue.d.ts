import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';

declare module '*.vue' {
  export default Vue;
}
// 扩充
// declare module 'vue/types/vue' {
//   import VueRouter from 'vue-router'
//   import {Route} from 'vue-router'
//   interface Vue {
//     $router: VueRouter,
//     $route: Route,
//   }
// }

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter;
    $config: any;
  }
}
