import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  exports: [
    BsDatepickerModule,
    TimepickerModule,
    PaginationModule,
    CollapseModule,
    ModalModule,
    AlertModule
  ]
})
export class BootstrapModule { }
