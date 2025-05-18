import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from './user.model';
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-login',
    imports: [FormsModule, NgIf],
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
    user: User = new User();
    confirmPasswd: string|null = null;
    passwordError: string|null = null;
    confirmPasswdError: string|null = null;

    @ViewChild('container') containerRef?: ElementRef;
    @ViewChild('loginButton') loginButtonRef?: ElementRef;
    @ViewChild('signUpButton') signUpButtonRef?: ElementRef;

    constructor(
        private router: Router) {

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

    confirmPassword(){
        if(this.confirmPasswd) {
            if (!(this.confirmPasswd === this.user.password)) {
                this.confirmPasswdError = "Passwords do not match";
            } else {
                this.confirmPasswdError = null;
            }
        }
    }
}
