import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Profile from '../views/Profile.vue';
import Hangman from '../views/Hangman.vue';
import Game2 from '../views/Game2.vue';
import Game3 from '../views/Game3.vue';
import Login from '../views/Login.vue';
import httpClient from '@/http/httpClient';
import { nextTick } from 'vue/types/umd';
import { MessageBus } from '@/components/MessageBus';

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
    path: '/hangman',
    name: 'Hangman',
    component: Hangman,
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
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      localStorage.removeItem('userData');
      MessageBus.$emit('logout');
      return next({ name: 'Login' });
    },
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let token = '';
  if (localStorage.userData) {
    token = JSON.parse(localStorage.userData).token;
  }

  if (to.path !== '/' && to.path !== '/logout') {
    if (!token) {
      if (router.currentRoute.name === 'Login') {
        return;
      }
      router.replace({ name: 'Logout' });
    }
  } else if (to.path !== '/logout') {
    if (token) {
      router.replace({ name: 'Profile' });
    }
  }
  next();
});

export default router;
