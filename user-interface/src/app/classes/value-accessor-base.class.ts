import { ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

export class ValueAccessorBase<T> implements ControlValueAccessor {
  protected innerValue: T;

  constructor(private cdr: ChangeDetectorRef) {
  }
  private changed = new Array<(value: T) => void>();
  private touched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changed.forEach(f => f(value));
    }
  }

  touch() {
    console.log('touch');
    this.touched.forEach(f => f());
  }

  writeValue(value: T) {
    this.innerValue = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (value: T) => void) {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void) {
    this.touched.push(fn);
  }
}
