import {Conversation, IConversation} from './conversation.model';
import {IUser, User} from './user.model';

export interface IMessage {
  id?: string;
  imageData?: Uint8Array | null;
  message?: string;
  status?: string;
  fromUser?: IUser | null;
  toConversation?: IConversation | null;
  report?: boolean;
}

export class Message implements IMessage {
  constructor(
    public id?: string,
    public imageData?: Uint8Array | null,
    public message?: string,
    public status?: string,
    public fromUser?: User | null,
    public toConversation?: Conversation | null,
    public report?: boolean,
  ) {}
}
