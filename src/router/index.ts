import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Profile from '../views/Profile.vue';
import Hangman from '../views/Hangman.vue';
import SlidePuzzle from '../views/SlidePuzzle.vue';
import TicTacToe from '../views/TicTacToe.vue';
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
    path: '/slidepuzzle',
    name: 'slidepuzzle',
    component: SlidePuzzle,
  },
  {
    path: '/tictactoe',
    name: 'tictactoe',
    component: TicTacToe,
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
