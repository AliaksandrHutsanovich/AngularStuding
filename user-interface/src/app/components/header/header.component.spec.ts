import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../entities/user';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const user = new User(
    'Alex',
    'Huts',
    'guts-817@rambler.ru',
  );
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let httpSpy;
  const subscribe = (fn) => {
    fn(user);
  };

  const removeItemSpy = jasmine.createSpy('removeItem');
  const getItemSpy = jasmine.createSpy('getItem').and.returnValue('user|email');
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const getItemSpyWhenNoAuth = jasmine.createSpy('getItem').and.returnValue(null);

  beforeEach(async(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    httpSpy.get.and.returnValue({ subscribe });

    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.removeItem = removeItemSpy;
    localStorage.getItem = getItemSpy;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onLogOut should be called', () => {
    const componentEl = fixture.nativeElement.querySelector('.menu__button');
    componentEl.click();

    expect(removeItemSpy).toHaveBeenCalled();
  });

  it('should create when no auth', () => {
    localStorage.getItem = getItemSpyWhenNoAuth;
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
