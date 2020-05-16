import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true;

  constructor(
    private users: UsersService
  ) {

  }

  isLoggedIn():boolean {
    return !!localStorage.getItem('email');
  }

  getUser():string {
    return localStorage.getItem('email');
  }

  logout() {
    this.users.logout();
  }
}
