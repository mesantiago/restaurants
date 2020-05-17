import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private api: ApiService
  ) { }

  register(user: User) {
    return this.api.post('users', user, undefined, false);
  }

  collections() {
    return this.api.get('users/collections');
  }

  login(user: User) {
    return new Observable(subscriber => {
      this.api.post('users/login', user, undefined, false)
        .subscribe((response: any) => {
          const { id, token } = response;
          localStorage.setItem('id', id);
          localStorage.setItem('token', token);
          localStorage.setItem('email', user.email);
          subscriber.next(response);
        },
        error => subscriber.error(error));
    })
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
}
