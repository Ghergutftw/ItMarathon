import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from './user.model';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule],
    templateUrl: "login.component.html",
    styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit {
    user: User = new User();

    @ViewChild('container') containerRef?: ElementRef;
    @ViewChild('loginButton') loginButtonRef?: ElementRef;
    @ViewChild('signUpButton') signUpButtonRef?: ElementRef;

    constructor() {}

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
        }
    }

    onSignUp(form: NgForm) {
        if (form.valid) {
            console.log('Signup form submitted', this.user);
        }
    }
}
