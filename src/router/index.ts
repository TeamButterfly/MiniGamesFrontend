import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Profile from '../views/Profile.vue';
import Game1 from '../views/Game1.vue';
import Game2 from '../views/Game2.vue';
import Game3 from '../views/Game3.vue';
import Login from '../views/Login.vue';
import httpClient from '@/http/httpClient';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/game1',
    name: 'Game1',
    component: Game1,
  },
  {
    path: '/game2',
    name: 'Game2',
    component: Game2,
  },
  {
    path: '/game3',
    name: 'Game3',
    component: Game3,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.name !== 'Login') {
    try {
      const { status, data } = await httpClient.get(`Authentication/Verify`);
      if (status === 200 && data === true) {
        router.push({ name: 'Profile' });
        next();
        return;
      }
    } catch (e) {
      console.log('"Unauthorized" - Rykkes til Login siden');
    }
    if (router.currentRoute.name === 'Login') {
      return;
    }
    router.push({ name: 'Login' });
  }
  next();
});

export default router;
