import { defineStore } from 'pinia';
import * as httpClient from '@/http/httpClient';
import { HttpResponse } from '@/http/httpResponse';
import { Account, User } from './models';

export interface MainState {
  globalLoading: boolean;

  activeAccount: Account | null;

  users: User[];
  accounts: Account[];
}

export const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
      globalLoading: false,

      activeAccount: null,

      users: [],
      accounts: [],
    };
  },

  getters: {
    account(): Account | null {
      if (localStorage.userData) {
        this.activeAccount = JSON.parse(localStorage.userData).account;
      }
      return this.activeAccount;
    },
  },
  actions: {
    async login(username: string, password: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.post('Authentication/Login', {
        username,
        password,
      });

      this.activeAccount = data.account;
      localStorage.setItem('userData', JSON.stringify(data));
      return { status, data };
    },
    async updateUser(user: User): Promise<HttpResponse> {
      const { status, data } = await httpClient.put('User', user);
      return { status, data };
    },
    async getAccount(): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Account');

      const userData = JSON.parse(localStorage.userData);
      userData.account = data;
      this.activeAccount = data;
      localStorage.setItem('userData', JSON.stringify(userData));

      return { status, data };
    },
  },
});
