import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[bordered]'
})
export class BorderDirective {
  private border: string;

  @Input() date: string;

  @HostBinding("style.border") get getBorderStyle(){
    const msPerDay = 86400000;
    const currentDate = new Date('4-26-2020');
    const minDate = currentDate.getTime() - 14 * msPerDay;
    const date = new Date(this.date);

    if (date < currentDate && date.getTime() >= minDate) {
      this.border = '1px solid green';
    } else if (date > currentDate) {
      this.border = '1px solid blue';
    } else {
      this.border = 'none';
    }
    return this.border;
  }


}
