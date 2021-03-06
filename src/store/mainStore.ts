import { defineStore } from 'pinia';
import * as httpClient from '@/http/httpClient';
import { HttpResponse } from '@/http/httpResponse';
import { Account, HangmanModel, SlidePuzzleModel, TicTacToeModel, User } from './models';

export interface MainState {
  globalLoading: boolean;

  activeAccount: Account | null;

  users: User[];
  accounts: Account[];

  hangmanModel: HangmanModel;

  slidePuzzleModel: SlidePuzzleModel;

  ticTacToeModel: TicTacToeModel;
}

export const useMainStore = defineStore('main', {
  state: (): MainState => {
    return {
      globalLoading: false,

      activeAccount: null,

      users: [],
      accounts: [],

      hangmanModel: new HangmanModel(),

      slidePuzzleModel: new SlidePuzzleModel(),

      ticTacToeModel: new TicTacToeModel(),
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
      const { status, data } = await httpClient.post('Authentication/Login', user);

      this.activeAccount = data.account;
      localStorage.setItem('userData', JSON.stringify(data));
      return { status, data };
    },
    async register(user: User): Promise<HttpResponse> {
      const { status, data } = await httpClient.post('Authentication/Register', user);

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
    async hangmanResetGame(): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/Reset');
      this.hangmanModel = data as HangmanModel;

      return { status, data };
    },

    async hangmanGuessLetter(letter: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/GuessLetter?letter=' + letter);
      this.hangmanModel = data as HangmanModel;

      return { status, data };
    },

    async hangmanGuessWord(word: string): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('Hangman/GuessWord?word=' + word);
      this.hangmanModel = data as HangmanModel;

      return { status, data };
    },

    //SlidePuzzle
    async slidePuzzleResetGame(size: number): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('SlidePuzzle/Reset?size=' + size);
      this.slidePuzzleModel = data as SlidePuzzleModel;

      return { status, data };
    },

    async slidePuzzleMove(swapvalue: number): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('SlidePuzzle/Move?swapvalue=' + swapvalue);
      this.slidePuzzleModel = data as SlidePuzzleModel;

      return { status, data };
    },

    //TicTacToe
    async ticTacToeResetGame(): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('TicTacToe/Reset?squares=3');
      this.ticTacToeModel = data as TicTacToeModel;

      return { status, data };
    },

    async ticTacToeSetField(row: number, col: number): Promise<HttpResponse> {
      const { status, data } = await httpClient.get('TicTacToe/SetField?row=' + row + '&col=' + col);
      this.ticTacToeModel = data as TicTacToeModel;

      return { status, data };
    },
  },
});
