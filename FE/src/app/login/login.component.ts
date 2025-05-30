import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from '../models/user.model';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {SignUp} from '../models/signup.model';
import {MessageService} from '../service/message.service';
import {LoginService} from '../service/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: "login.component.html",
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
  user: User = new User();
  signUpData: SignUp = new SignUp();
  confirmPasswd: string | null = null;
  passwordError: string | null = null;
  confirmPasswdError: string | null = null;

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
  demo: boolean = false;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private loginService: LoginService
  ) {

  }


  ngOnInit() {
  }

  togglePanel() {
    if (this.containerRef) {
      this.containerRef.nativeElement.classList.toggle("right-panel-active");
    }
  }


  onLogin(form: NgForm) {
    if (form.valid) {
      this.loginService.login(this.user).subscribe({
        next: (response) => {
          if (response.body?.status === 'success') {
            sessionStorage.setItem("user", JSON.stringify(this.user).toString());
            this.router.navigate(['/home-menu']);
          } else {
            this.passwordError = 'Invalid credentials';
          }
        },
        error: () => {
          this.passwordError = 'An error occurred during login';
        }
      });
    }
  }

  onSignUp(form: NgForm) {
    if (form.valid) {
      this.loginService.signUp(this.user).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.togglePanel();
            this.router.navigate(['/']);
          } else {
            alert(response.message || 'Sign up failed');
          }
        },
        error: () => {
          alert('An error occurred during sign up');
        }
      });
    }
  }

  verifyPassword() {
    console.log("login")
    // if (this.signUpData.password == undefined) {
    //     this.passwordError = "Password cannot be null";
    //     return;
    // }
    //
    // if (this.signUpData.password.length < 8) {
    //     this.passwordError = "Password must have at least 8 characters";
    //     return
    // }
    //
    // if (!/[A-Z]/.test(this.signUpData.password)) {
    //     this.passwordError = "Password must contain at least one uppercase";
    //     return;
    // }
    //
    // if (!/[a-z]/.test(this.signUpData.password)) {
    //     this.passwordError = "Password must contain at least one lowercase";
    //     return;
    // }
    //
    // if (!/[0-9]/.test(this.signUpData.password)) {
    //     this.passwordError = "Password must contain at least one digit";
    //     return;
    // }
    //
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(this.signUpData.password)) {
    //     this.passwordError = "Password must contain at least one special character";
    //     return;
    // }
    //
    // this.passwordError = "";
  }

  confirmPassword() {
    if (this.confirmPasswd) {
      if (!(this.confirmPasswd === this.signUpData.password)) {
        this.confirmPasswdError = "Passwords do not match";
      } else {
        this.confirmPasswdError = null;
      }
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.sendSuccess = false;
    this.sendError = '';
  }

  sendMessage(): void {
    if (!this.selectedFile || !this.messageText) {
      this.error = 'Please select an image and enter a message';
      return;
    }

    this.isLoading = true;
    this.error = null;
    let user_name = 'madalin';

    this.messageService.sendMessage(this.selectedFile, this.messageText,user_name).subscribe({
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

  forgotPassword() {
    this.router.navigate(['/forgot-password'], { queryParams: { name: this.user.name } });
  }
}
