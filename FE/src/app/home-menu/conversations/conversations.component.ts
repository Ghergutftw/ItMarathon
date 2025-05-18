import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageService} from '../../service/message.service';
import {LoginService} from '../../service/login.service';
import {SignUp} from '../../models/signup.model';

@Component({
    standalone: true,
    selector: 'app-conversations',
  imports: [
    FormsModule
  ],
    templateUrl: './conversations.component.html',
    styleUrl: './conversations.component.css'
})
export class ConversationsComponent {

  selectedFile: File | null = null;

  messageText: string = '';
  text: string = '';
  messageId: string = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ) {

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
    let user : string = '';

    if( sessionStorage.getItem('user')){
      user = JSON.parse(sessionStorage.getItem('user') || '{}').name;
    }

    this.messageService.sendMessage(this.selectedFile, this.messageText , user , ).subscribe({
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
}
