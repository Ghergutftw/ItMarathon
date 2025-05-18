// src/app/core/models/user.model.ts

import {ROLES} from '../login/user.model';

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  role?: ROLES;
  coins?: number;
  premium?: boolean;
}

export class User implements IUser {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public role?: ROLES,
    public coins?: number,
    public premium?: boolean
  ) {}
}
