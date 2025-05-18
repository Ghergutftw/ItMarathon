export interface ISignUp {
  email?: string;
  password?: string;
  name?: string;
}

export class SignUp implements ISignUp {
  constructor(
    public name?: string,
    public email?: string,
    public password?: string,
  ) {}
}
