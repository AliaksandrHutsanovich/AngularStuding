import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessorBase } from 'src/app/classes/value-accessor-base.class';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputDateComponent,
      multi: true,
    },
  ],
})
export class InputDateComponent extends ValueAccessorBase<string> {
  @Input() isError: boolean;
  constructor() {
    super();
  }

  handleBlur(): void {
    this.touch();
  }
}
