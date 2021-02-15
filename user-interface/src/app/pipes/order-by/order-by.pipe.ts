import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], order: string): any[] {
    if (!value || !order) {
      return value;
    } else if (value.length <= 1) {
      return value;
    }
    return value.slice().sort((a, b) => a[order] - b[order]);
  }

}
