import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(time: number): unknown {
    return moment().startOf('day').add(time, 'ms').format('hh:mm a');
  }

}
