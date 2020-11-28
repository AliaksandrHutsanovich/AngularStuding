import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../../entities';

import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';

describe('HeaderComponent', () => {
  const user = new User(
    'Alex',
    'Huts',
    'guts-817@rambler.ru',
  );
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let httpSpy;
  let storeSpy;
  let translateSpy;
  const subscribe = (fn) => {
    fn(user);
  };
  const pipe = (arg) => {
    return { subscribe };
  };

  @Pipe({ name: 'translate' })
  class TranslatePipe implements PipeTransform {

    transform(value: string): string {
      return value;
    }
  }

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
    httpSpy.get.and.returnValue({ subscribe, pipe });
    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);
    translateSpy = jasmine.createSpyObj('TranslateService', [
      'setDefaultLang'
    ]);


    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, TranslatePipe ],
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
