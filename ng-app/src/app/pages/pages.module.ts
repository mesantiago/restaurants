import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ServicesModule } from '../services/services.module';
import { RouterModule } from '@angular/router';
import { BootstrapModule } from '../bootstrap/bootstrap.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ServicesModule,
    BootstrapModule,
    PipesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class PagesModule { }
