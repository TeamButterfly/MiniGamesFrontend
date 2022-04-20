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


export class HangmanModel{
  life: number = 8;
  isLetterGuessed!: boolean;
  isGameRunning: boolean = false;
  word!: string;
  guessletter!: string;
  wrongguesses!: string;
  playerguesses!: string;
}