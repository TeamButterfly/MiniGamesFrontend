import { defineStore } from 'pinia';
import * as httpClient from '@/http/httpClient';
import { HttpResponse } from '@/http/httpResponse';
import { Account, HangmanModel, User } from './models';

export interface MainState {
  globalLoading: boolean;

  activeAccount: Account | null;

  users: User[];
  accounts: Account[];

  hangmanModel: HangmanModel;
}

export const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
      globalLoading: false,

      activeAccount: null,

      users: [],
      accounts: [],

      hangmanModel: new HangmanModel(),
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
    async login(user: User): Promise<HttpResponse> {
      const { status, data } = await httpClient.post(
        'Authentication/Login',
        user
      );

      this.activeAccount = data.account;
      localStorage.setItem('userData', JSON.stringify(data));
      return { status, data };
    },
    async register(user: User): Promise<HttpResponse> {
      const { status, data } = await httpClient.post(
        'Authentication/Register',
        user
      );

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
    
    //Hangman
    async hangmanStart(): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/Start');

      this.hangmanModel = new HangmanModel();
      this.hangmanModel.isGameRunning = true;

      return { status, data };
    },

    async hangmanGuessLetter(letter: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/GuessLetter?letter=' + letter);
      const hangmanData = data as HangmanModel;
      this.hangmanModel.guessletter = hangmanData.guessletter;
      this.hangmanModel.isGameRunning = hangmanData.isGameRunning;
      this.hangmanModel.isLetterGuessed = hangmanData.isLetterGuessed;
      this.hangmanModel.life = hangmanData.life;
      this.hangmanModel.playerguesses = hangmanData.playerguesses;
      this.hangmanModel.word = hangmanData.word;
      this.hangmanModel.wrongguesses = hangmanData.wrongguesses;

      return { status, data };
    },

    async hangmanGuessWord(word: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/GuessWord?word=' + word);

      this.hangmanModel = data as HangmanModel;

      return { status, data };
    },
  },
});
