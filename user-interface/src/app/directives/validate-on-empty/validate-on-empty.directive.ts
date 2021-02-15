import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateOnEmpty]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateOnEmptyDirective,
    multi: true
  }]
})
export class ValidateOnEmptyDirective implements Validator {

  @Input() required: boolean;
  validate(control: AbstractControl): {[key: string]: any} | null {
    if (this.required && !control.value) {
      return { messages: ['PAGES.ADD_COURSE.VALIDATION_MESSAGES.REQIURED'] };
    } else if (control.value instanceof Array && !control.value.length) {
      return { messages: ['PAGES.ADD_COURSE.VALIDATION_MESSAGES.AUTHORS_REQUIRED'] };
    }
    return null;
  }

}
