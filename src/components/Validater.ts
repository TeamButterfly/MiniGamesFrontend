import { User } from '@/store/models';

export class ValidaterObject {
  success: boolean = true;
  message: string = '';
}

export default class Validater {
  static validate(user: User): ValidaterObject {
    const validaterObject = new ValidaterObject();
    if (user.username.length < 3 || user.username.length > 20) {
      validaterObject.message += 'Brugernavnet skal være 3-20 karakterer \n';
      validaterObject.success = false;
    }
    if (user.password.length < 3 || user.password.length > 20) {
      validaterObject.message += 'Passwordet skal være 3-20 karakterer \n';
      validaterObject.success = false;
    }
    return validaterObject;
  }
}
