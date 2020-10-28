import { Component, OnInit, AfterContentChecked, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AuthorsService } from 'src/app/services/authors/authors.service';

import { ValueAccessorBase } from 'src/app/classes/value-accessor-base.class';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AuthorsComponent,
      multi: true,
    },
  ],
})
export class AuthorsComponent extends ValueAccessorBase<string[]>
  implements OnInit, AfterContentChecked {
  authorsList: string[];
  inputValue: string;
  errorMessage: string;
  savedValue: string[];
  @Input() isError: boolean;
  constructor(
    private authorsService: AuthorsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.authorsService.getList()
      .subscribe((authors) => {
        this.authorsList = authors;
      });
  }

  ngAfterContentChecked(): void {
    if (this.value && this.authorsList) {
      this.value.map(v => {
        if (this.authorsList.indexOf(v) !== -1)
          this.authorsList.splice(this.authorsList.indexOf(v), 1);
      });
    }
  }

  copyValue(): void {
    this.savedValue = Object.assign([], this.value);
  }

  setValue(): void {
    this.value = this.savedValue;
    this.copyValue();
  }

  handleSelect(): void {
    this.copyValue();
    if (this.authorsList.indexOf(this.inputValue) !== -1) {
      this.savedValue.push(this.inputValue);
      this.authorsList.splice(this.authorsList.indexOf(this.inputValue), 1);
      this.setValue();
      this.inputValue = '';
      this.onBlur();
    }
  }

  onDeleteAuthor(author: string): void {
    this.copyValue();
    this.savedValue.splice(this.savedValue.indexOf(author), 1);
    this.authorsList.push(author);
    this.setValue();
    this.onBlur();
  }

  validate(): void {
    if (this.value.length) {
      this.errorMessage = '';
    } else {
      this.errorMessage = 'At least one author shoulbe chosen';
    }
  }

  onBlur(): void {
    this.touch();
  }
}
