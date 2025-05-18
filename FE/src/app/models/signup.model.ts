// src/app/core/models/signup.dto.ts

export interface ISignUp {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
}

export class SignUp implements ISignUp {
  constructor(
    public username?: string,
    public email?: string,
    public password?: string,
    public name?: string,
    public phoneNumber?: string
  ) {}
}
