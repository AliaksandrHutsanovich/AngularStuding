import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Component, Pipe, PipeTransform } from '@angular/core';

import { ValueAccessorBase } from 'src/app/classes/value-accessor-base.class';
import { AuthorsComponent } from './authors.component';
import { ChipComponent } from '../chip';
import { AuthorsService } from 'src/app/services';
import { FormsModule } from '@angular/forms';

describe('AuthorsComponent', () => {
  const authors = [
    'Silvestor Stallone',
    'Viskas Oldevichus',
    'Sebastiano Ebanies',
  ]
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let httpSpy;
  const spy = jasmine.createSpy();
  const subscribe = (fn) => {
    spy();
    fn(authors);
  };

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
  }

  @Component({
    template: `
      <app-authors [(ngModel)]="arr"></app-authors>
    `,
  })
  class TestHostComponent {
    arr: string[] = ['Sebastiano Ebanies'];
  }

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.get.and.returnValue({ subscribe });

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        TestHostComponent,
        AuthorsComponent,
        TranslatePipe,
        ChipComponent,
      ],
      providers: [
        AuthorsService, ValueAccessorBase,
        { provide: HttpClient, useValue: httpSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('authors list should be decreased by 1 after each setting value', () => {
    expect(spy).toHaveBeenCalled();
    const component = fixture.componentInstance;
    const componentEl = fixture.nativeElement.querySelector('input');
    component.inputValue = authors[0];
    componentEl.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(component.authorsList.length).toEqual(2);

    const closeIcon = fixture.nativeElement.querySelector('img');
    closeIcon.click();
    fixture.detectChanges();

    expect(component.authorsList.length).toEqual(3);
  });

  it('value should be set to component', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    hostComponent.arr = ['Silvestor Stallone'];
    hostFixture.detectChanges();
  });
});
