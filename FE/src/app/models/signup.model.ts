
export interface ISignUp {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
}

export class SignUp implements ISignUp {
  constructor(
    public email?: string,
    public password?: string,
    public name?: string,
    public phoneNumber?: string
  ) {}
}
