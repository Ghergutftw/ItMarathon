import {IMessage} from '@stomp/stompjs';
import {IUser} from './user.model';

export interface IConversation {
  id?: string;
  messages?: IMessage[];
  name?: string;
  users?: IUser[];
}

export class Conversation implements IConversation {
  constructor(
    public id?: string,
    public name?: string,
    public messages?: IMessage[],
    public users?: IUser[]
  ) {}
}
