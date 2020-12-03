import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../services';
import { User } from '../../entities';

describe('LoginFormComponent', () => {
  const user = new User(
    'Alex',
    'Huts',
    'guts-817@rambler.ru',
  );
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let httpSpy;
  let storeSpy;
  let translateSpy;
  const subscribe = (fn) => {
    fn(user);
  };

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
  }

  const setItemSpy = jasmine.createSpy('setItem');
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.post.and.returnValue({ subscribe });

    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);

    translateSpy = jasmine.createSpyObj('TranslateService', [
      'instant'
    ]);

    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent, TranslatePipe ],
      imports: [ ReactiveFormsModule ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: Store, useValue: storeSpy },
        { provide: TranslateService, useValue: translateSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem = setItemSpy;
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handleClick on login should be called', () => {
    const component = fixture.componentInstance;
    component.form.get('email').setValue('ret@re.ru');
    component.form.get('password').setValue('111');
    const componentEl = fixture.nativeElement.querySelector('.form__submit');
    componentEl.click();

    expect(setItemSpy).toHaveBeenCalled();
  });

  it('validate should be called with errors', () => {
    const componentEl = fixture.nativeElement.querySelector('input');
    componentEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(translateSpy.instant).toHaveBeenCalled();
  })
});
