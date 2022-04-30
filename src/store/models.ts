export enum TicTacToeEnum {
  None = 0,
  Cross = 1,
  Circle = 2,
}

export class User {
  userId: string = '';
  username: string = '';
  password: string = '';
}

export class Account {
  accountId: string = '';
  points: number = 0;
  userId: string = '';
  user!: User;
}

export class HangmanModel {
  life!: number;
  revealedWord!: string;
  isGameWon!: boolean;
}

export class SlidePuzzleModel {
  board!: number[];
  isGameWon!: boolean;
}

export class TicTacToeModel {
  board!: TicTacToeEnum[][];
  winner!: TicTacToeEnum;
}
