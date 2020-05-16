import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DaysPipe } from './days.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    DaysPipe,
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DaysPipe,
    TimePipe
  ]
})
export class PipesModule { }
