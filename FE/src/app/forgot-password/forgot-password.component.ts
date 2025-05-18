import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgIf} from '@angular/common';
import {UserService} from '../service/user.service';
import {LoginService} from '../service/login.service';

@Component({
  selector: 'forgot-password',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  username: string = '';
  usernameFromRoute: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  userExists: boolean = false;
  checkingUser: boolean = false;
  resetSuccess: boolean = false;
  submitting: boolean = false;
  passwordError: string = '';
  errorMessage: string = '';
  passwordsMatch: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['name']) {
        this.username = params['name'];
        this.usernameFromRoute = true;
        this.checkUsername(); // Auto-check if username comes from route
      }
    });
  }

  checkUsername() {
    this.checkingUser = true;
    this.errorMessage = '';
    console.log('Checking username:', this.username)
    this.loginService.checkIfNameExists(this.username).subscribe({
      next: (response) => {
        this.userExists = response.status === "success";
        this.checkingUser = false;
        if (!this.userExists) {
          this.errorMessage = 'Username does not exist';
        }
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error checking username';
        this.checkingUser = false;
      }
    });

  }

  validatePassword() {
    if (this.newPassword && this.confirmPassword) {
      this.passwordsMatch = this.newPassword === this.confirmPassword;
      this.passwordError = this.passwordsMatch ? '' : 'Passwords do not match';

      // Add additional password strength checks if needed
      if (this.newPassword.length < 8) {
        this.passwordError = 'Password must be at least 8 characters';
        this.passwordsMatch = false;
      }
    } else {
      this.passwordsMatch = false;
    }
  }


  onSubmit(forgotPasswordForm: NgForm) {
    this.loginService.updatePassword(this.username, this.newPassword).subscribe({
      next: (response) => {
        this.resetSuccess = true;
        this.submitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error resetting password';
        this.resetSuccess = false;
        this.submitting = false;
      }
    });
  }
}
