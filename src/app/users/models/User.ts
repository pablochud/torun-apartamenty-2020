import {ROLE} from './Role';

export class User {
  username: string;
  role: ROLE;
  expireTime: Date;
  password: string;
  apartments: Apartments[];
}

export class Apartments {
  apartmentId: number;
  idoSellKeyName: string;
}
