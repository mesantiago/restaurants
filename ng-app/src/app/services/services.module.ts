import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { RestaurantsService } from './restaurants.service';
import { UsersService } from './users.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    RestaurantsService,
    UsersService
  ],
})
export class ServicesModule { }
