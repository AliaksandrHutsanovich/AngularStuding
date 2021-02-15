import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(stringDate: string): string {
    const date = new Date(stringDate);
    return date.getDate() + ' ' + date.toLocaleString('default', { month: 'short', year: 'numeric' });
  }

}
