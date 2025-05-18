import {IUser, User} from './user.model';
import {IMessage, Message} from './message.model';

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
    public messages?: Message[],
    public users?: User[]
  ) {}
}
