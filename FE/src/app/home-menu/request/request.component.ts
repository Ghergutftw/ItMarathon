import {Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {User} from '../../models/user.model';
import {NgFor, NgForOf, NgIf} from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, NgForOf, NgIf, NgFor],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit {
  sessionUser: User = JSON.parse(sessionStorage.getItem('user')!);
  requests: User[] = [];

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit() {
    if (this.sessionUser.friendRequest?.length === 0 || this.sessionUser.friendRequest === undefined) {
      const user1 = new User(undefined, "user1");
      const user2 = new User(undefined, "user1");
      const user3 = new User(undefined, "user1");
      if (this.sessionUser.friendRequest === undefined) {
        this.sessionUser.friendRequest = [];
      }
      this.sessionUser.friendRequest.push(user1);
      this.sessionUser.friendRequest.push(user2);
      this.sessionUser.friendRequest.push(user3);
    }
    this.requests = this.sessionUser.friendRequest ?? [];
  }
}
