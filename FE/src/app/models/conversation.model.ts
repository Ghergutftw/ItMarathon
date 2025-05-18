import {IMessage} from '@stomp/stompjs';
import {IUser} from './user.model';

export interface IConversation {
  id?: string; // UUID as string
  messages?: IMessage[];  // list of messages
  users?: IUser[];        // list of users
}

export class Conversation implements IConversation {
  constructor(
    public id?: string,
    public messages?: IMessage[],
    public users?: IUser[]
  ) {}
}
