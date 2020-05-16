import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces';
import { NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: User;
  error: string;

  constructor(
    private users: UsersService,
    private router: Router
  ) {
    this.credentials = {
      email: undefined,
      password: undefined
    };
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.users.login(this.credentials)
        .subscribe(user => {
          this.router.navigateByUrl('/');
        }, response => {
          console.log(response);
          this.error = response.error && response.error.message || 'Unable to login. Check credentials';
        });
    }
  }
}
