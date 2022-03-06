import { defineStore } from 'pinia';
import * as httpClient from '@/http/httpClient';
import { HttpResponse } from '@/http/httpResponse';
import { Account, User } from './models';

export interface MainState {
  activeAccount: Account | null;

  users: User[];
  accounts: Account[];
}

export const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
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

      this.activeAccount = data;

      return { status, data };
    },
  },
});
