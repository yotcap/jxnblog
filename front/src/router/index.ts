import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'JXN',
      redirect: '/blog',
    },
    {
      path: '/blog',
      name: 'entrancy',
      // component: () => import('@/views/Entrance.vue'),
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/detail/:id',
      name: 'article-detail',
      component: () => import ('@/views/article-detail.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});
