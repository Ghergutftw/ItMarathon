export class User{
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public password?: string,
    public role?: ROLES,
    public coins?: number,
    public premium?: boolean,
  ) {
  }
}

export enum ROLES{
  USER = "USER",
  ADMIN = "ADMIN"
}
