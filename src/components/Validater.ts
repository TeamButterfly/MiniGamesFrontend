import { User } from '@/store/models';

export class ValidaterObject {
  success: boolean = false;
  message: string = '';
}

export default class Validater {
  static validate(user: User): ValidaterObject {
    const validaterObject = new ValidaterObject();
    if (user.password.length < 3 || user.password.length > 20) {
      validaterObject.message =
        'Passwordet skal være mellem 3 og 20 karakterer';
    }
    if (user.username.length < 3 || user.username.length > 20) {
      validaterObject.message =
        'Brugernavnet skal være mellem 3 og 20 karakterer';
    }
    validaterObject.success = true;
    return validaterObject;
  }
}
