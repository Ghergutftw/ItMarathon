import {IMessage} from '@stomp/stompjs';
import {IUser} from './user.model';

export interface IConversation {
  id?: string;
  messages?: IMessage[];
  users?: IUser[];
}

export class Conversation implements IConversation {
  constructor(
    public id?: string,
    public messages?: IMessage[],
    public users?: IUser[]
  ) {}
}
