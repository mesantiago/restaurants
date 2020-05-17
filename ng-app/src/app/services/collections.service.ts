import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(
    private api: ApiService
  ) { }

  create(name: string) {
    return this.api.post('collections', {
      name
    });
  }

  add(id: string, restaurantId: string) {
    return this.api.put(`collections/${id}/add`, { restaurantId });
  }
}
