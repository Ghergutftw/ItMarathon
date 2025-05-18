import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from './user.model';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: "login.component.html",
  standalone: true,
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
  confirmPasswd: string | null = null;
  confirmPasswdError: string | null = null;
  user: User = new User();
  passwordError: string = "";
  messageText: string = '';
  selectedFile: File | null = null;
  text: string = '';
  sendSuccess: boolean = false;
  sendError: string = '';
  messageId: string = '';
  isLoading = false;
  error: string | null = null;
  messageData: any = null;
  @ViewChild('container') containerRef?: ElementRef;
  @ViewChild('loginButton') loginButtonRef?: ElementRef;
  @ViewChild('signUpButton') signUpButtonRef?: ElementRef;

  constructor(
    private router: Router,
    private messageService: MessageService
  ) {

  }


  ngOnInit() {
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.sendSuccess = false;
    this.sendError = '';
  }

  togglePanel() {
    if (this.containerRef) {
      this.containerRef.nativeElement.classList.toggle("right-panel-active");
    }
  }


  onLogin(form: NgForm) {
    if (form.valid) {
      console.log('Login form submitted', this.user)
      this.router.navigate(['/home-menu']);
    }
  }

  onSignUp(form: NgForm) {
    if (form.valid) {
      //ruta la home menu component
      //this.route
      console.log('Signup form submitted', this.user);
      this.router.navigate(['/home-menu']);
    }
  }

  verifyPassword() {
    console.log("login")
    if (this.user.password == undefined) {
      this.passwordError = "Password cannot be null";
      return;
    }

    if (this.user.password.length < 8) {
      this.passwordError = "Password must have at least 8 characters";
      return
    }
    if (this.user.password.length < 8) {
      this.passwordError = "Password must have at least 8 characters";
    }

    if (!/[A-Z]/.test(this.user.password)) {
      this.passwordError = "Password must contain at least one uppercase";
      return;
    }

    if (!/[a-z]/.test(this.user.password)) {
      this.passwordError = "Password must contain at least one lowercase";
      return;
    }

    if (!/[0-9]/.test(this.user.password)) {
      this.passwordError = "Password must contain at least one digit";
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.user.password)) {
      this.passwordError = "Password must contain at least one special character";
      return;
    }

    this.passwordError = "";
  }

  confirmPassword() {
    if (this.confirmPasswd) {
      if (!(this.confirmPasswd === this.user.password)) {
        this.confirmPasswdError = "Passwords do not match";
      } else {
        this.confirmPasswdError = null;
      }
    }
  }

  sendMessage(): void {
    if (!this.selectedFile || !this.messageText) {
      this.error = 'Please select an image and enter a message';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.messageService.sendMessage(this.selectedFile, this.messageText).subscribe({
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

  getMessage(): void {
    if (!this.messageId) {
      this.error = 'Please enter a message ID';
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.messageService.getMessage(this.messageId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.messageData = {
          ...response,
          imageUrl: this.messageService.createImageUrl(response.imageData)
        };
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.message || 'Failed to retrieve message';
      }
    });
  }
}
