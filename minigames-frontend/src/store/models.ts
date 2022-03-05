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
