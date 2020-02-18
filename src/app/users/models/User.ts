import {ROLE} from './Role';

export class User {
  username: string;
  role: ROLE;
  expireTime: Date;
  password: string;
  apartments: number[];
}
