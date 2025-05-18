import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-menu',
  imports: [
    RouterOutlet
  ],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.css'
})
export class HomeMenuComponent {


  constructor(
    private router: Router
  ) {
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
