import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {User} from './user.model';
import {Router} from '@angular/router';

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
          this.router.navigate(['/home']);
        }
    }

    onSignUp(form: NgForm) {
        if (form.valid) {
            console.log('Signup form submitted', this.user);
          this.router.navigate(['/home']);
        }
    }
}
