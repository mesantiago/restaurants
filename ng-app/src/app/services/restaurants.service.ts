import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(
    private api: ApiService
  ) { }

  search(name: string, day: Number, time: Number, page: Number, limit: Number) {
    return this.api.get('restaurants', {
      name: name,
      day: day,
      time: time,
      page: page,
      limit: limit
    }, undefined, false);
  }
}
