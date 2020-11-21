import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  const subscribe = (fn) => {
    fn(user);
  };

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

    TestBed.configureTestingModule({
      declarations: [ LoginFormComponent ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
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
    const componentEl = fixture.nativeElement.querySelector('.form__submit');
    componentEl.click();

    expect(setItemSpy).toHaveBeenCalled();
  });
});
