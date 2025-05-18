
export interface IResponse {
  status?: string;
  message?: string;
}

export class Response implements IResponse {
  constructor(
    public status?: string,
    public message?: string
  ) {}
}
