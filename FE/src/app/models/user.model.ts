import {Conversation} from './conversation.model';

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: ROLES;
  coins?: number;
  premium?: boolean;
  friends?: IUser[];
  friendRequest?: IUser[];
  conversations?: Conversation[];
  banned?: boolean;
}
export class User implements IUser {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public role?: ROLES,
    public coins?: number,
    public premium?: boolean,
    public friends?: User[],
    public friendRequest?: User[],
    public conversations?: Conversation[],
    public banned?: boolean,
  ) {
    this.friendRequest = friendRequest ?? [];
    this.conversations = conversations ?? [];
    this.friends = friends ?? [];
  }
}

export enum ROLES {
  USER = "USER",
  ADMIN = "ADMIN"
}
