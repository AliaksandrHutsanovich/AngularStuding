import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../entities';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(values: Course[], searchValue?: string): Course[] {
    return searchValue ? values.filter((value: Course) => value.title.match(searchValue)) : values;
  }

}
