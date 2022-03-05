import { defineStore } from 'pinia';
import * as httpClient from '@/http/httpClient';
import { HttpResponse } from '@/http/httpResponse';
import { Account, User } from './models';

export interface MainState {
  user: User | null;
  account: Account | null;
  users: User[];
  accounts: Account[];
}

export const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
      user: null,
      account: null,
      users: [],
      accounts: [],
    };
  },

  actions: {
    async login(username: string, password: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.post('Authentication/Login', {
        username,
        password,
      });
      return { status, data };
    },
    async getAccountByUserId(userId: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.get(`Account/GetAccountByUserId?id=${userId}`);
      return { status, data };
    },
  },
});
