import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

import { AuthorsComponent } from './authors.component';
import { AuthorsService } from 'src/app/services';

describe('AuthorsComponent', () => {
  const authors = [
    'Silvestor Stallone',
    'Viskas Oldevichus',
    'Sebastiano Ebanies',
  ]
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let httpSpy;
  const subscribe = (fn) => {
    fn(authors);
  };

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
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
      declarations: [ AuthorsComponent, TranslatePipe ],
      providers: [
        AuthorsService,
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
});
