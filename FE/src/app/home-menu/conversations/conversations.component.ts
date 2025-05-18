import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from '../../service/message.service';
import {LoginService} from '../../service/login.service';
import {SignUp} from '../../models/signup.model';
import {ConversationService} from '../../service/conversation.service';
import {Conversation} from '../../models/conversation.model';
import {NgForOf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-conversations',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './conversations.component.html',
  styleUrl: './conversations.component.css'
})
export class ConversationsComponent implements OnInit {

  selectedFile: File | null = null;

  messageText: string = '';
  text: string = '';
  messageId: string = '';
  isLoading = false;
  error: string | null = null;
  user: string = '';
  groups: Conversation[] = [];
  peoples: Conversation[] = [];


  constructor(
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService,
    private conservationService: ConversationService
  ) {
    this.user = '';
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      // @ts-ignore
      this.user = sessionStorage.getItem('user');
    }

    if (this.user) {
      this.conservationService.getConversationForUser(this.user).subscribe({
        next: (response) => {
          this.groups = response.filter((conversation: Conversation) =>
            Array.isArray(conversation.users) &&
            conversation.users.length > 2);

          this.peoples = response.filter((conversation: Conversation) =>
            Array.isArray(conversation.users) &&
            conversation.users.length === 2);

          // Optional: Handle conversations with < 2 participants
          const invalidConversations = response.filter((conversation: Conversation) =>
            !Array.isArray(conversation.users) ||
            conversation.users.length < 2);

          if (invalidConversations.length > 0) {
            console.warn('Found conversations with invalid participant counts:', invalidConversations);
          }
        },
        error: (err) => {
          console.error('Error fetching conversations:', err);
        }
      });
    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  sendMessage(): void {
    if (!this.selectedFile || !this.messageText) {
      this.error = 'Please select an image and enter a message';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.messageService.sendMessage(this.selectedFile, this.messageText, this.user).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.messageId = response.id;
        this.messageText = '';
        this.selectedFile = null;
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to send message';
      }
    });
  }

  getParticipantInAPeopleConversation(people: Conversation) {
    if(people.users){
      if (people.users[0] !== this.user) {
        return people.users[1].name;
      } else {
        return people.users[0].name;
      }
    }
    return '';
  }
}
