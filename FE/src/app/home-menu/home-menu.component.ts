import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home-menu',
  imports: [RouterOutlet],
  templateUrl: './home-menu.component.html',
  styleUrl: './home-menu.component.css'
})
export class HomeMenuComponent {


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  navigateTo(path: string) {
    this.router.navigate(['/home-menu', path]);
  }
}
