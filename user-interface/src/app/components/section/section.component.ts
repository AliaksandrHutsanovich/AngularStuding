import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  Subscription,
  fromEvent,
} from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements AfterViewInit, OnDestroy {
  private subscription: Subscription;
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }

  @Output() onSearched = new EventEmitter<string>();

  @ViewChild('searchInput') 
  input: ElementRef;

  ngAfterViewInit() {
    const search$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        filter(({ target: { value } }) => value.length > 2 || value.length === 0),
        map(({ target: { value } }) => value),
        debounceTime(600),
        distinctUntilChanged(),
      );
    this.subscription = search$
      .subscribe({
        next: (text) => {
          this.onSearched.emit(this.form.get('search').value);
        },
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
