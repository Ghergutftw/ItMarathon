import {Conversation, IConversation} from './conversation.model';
import {IUser, User} from './user.model';

export interface IMessageDTO {
  id?: string;           // UUID as string
  imageData?: Uint8Array | null;  // byte[] in Java → Uint8Array or possibly base64 string
  message?: string;
  status?: string;
  fromUser?: IUser | null;
  toConversation?: IConversation | null;
  report?: boolean;
}

export class MessageDTO implements IMessageDTO {
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
