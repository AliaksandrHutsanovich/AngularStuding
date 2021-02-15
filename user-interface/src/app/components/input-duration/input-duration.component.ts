import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ValueAccessorBase } from 'src/app/classes/value-accessor-base.class';

@Component({
  selector: 'app-input-duration',
  templateUrl: './input-duration.component.html',
  styleUrls: ['./input-duration.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputDurationComponent,
      multi: true,
    },
  ],
})
export class InputDurationComponent extends ValueAccessorBase<string> {
  @Input() isError: boolean;
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  handleBlur(): void {
    this.touch();
  }
}
