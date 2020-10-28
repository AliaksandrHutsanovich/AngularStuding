import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTime'
})
export class TransformTimePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    const hours = Math.floor(Number(value)/60);
    const minutes = Number(value) - hours * 60;
    return (hours ? `${hours}h ` : '') + `${minutes}min`;
  }

}
