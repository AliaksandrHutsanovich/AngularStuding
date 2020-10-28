import { IUser } from '../interfaces/user';

export class User implements IUser {
  firstName: string;
  lastName: string;
  email: string;

  constructor(
    userFirstName: string,
    userLastName: string,
    email: string,
  ) {
    this.firstName = userFirstName;
    this.lastName = userLastName;
    this.email = email;
  }
}
