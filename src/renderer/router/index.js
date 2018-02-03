import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QRCode',
      component: require('@/views/QRCode').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
