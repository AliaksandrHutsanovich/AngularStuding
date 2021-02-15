import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALIDATORS } from '@angular/forms';
import { InputDateComponent } from '../../components/input-date';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { ValidateOnEmptyDirective } from './validate-on-empty.directive';

describe('ValidateValueDirective', () => {
  it('should create an instance', () => {
    const directive = new ValidateOnEmptyDirective();
    expect(directive).toBeTruthy();
  });

  it('validate should be called', () => {
    @Pipe({ name: 'translate' })
    class TranslatePipe implements PipeTransform {

      transform(value: string): string {
        return value;
      }
    }
    @Component({
      template: `
        <form (ngSubmit)="handleSubmit()">
          <app-input-date
            [(ngModel)]="date"
            [required]="true"
            validateOnEmpty
            name="creationDate"
            #creationDate="ngModel"
          >
            <p *ngIf="creationDate.errors?.messages">
              Element
            </p>
          </app-input-date>
          <button type="submit">Submit</button>
        </form>
      `,
    })
    class TestHostComponent {
      date: Date;
      handleSubmit(): void {
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        InputDateComponent,
        TranslatePipe,
        ValidateOnEmptyDirective,
      ],
      imports: [
        FormsModule,
      ],
    })
    .compileComponents();

    const fixture:ComponentFixture<TestHostComponent> = TestBed.createComponent(TestHostComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const componentEl = fixture.nativeElement.querySelector('p');
    expect(componentEl).toBeTruthy();
  });
});
