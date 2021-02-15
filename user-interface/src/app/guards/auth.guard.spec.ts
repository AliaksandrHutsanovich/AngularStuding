import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const urlTree = new UrlTree();
  let httpSpy;
  let storeSpy;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'parseUrl']);
  routerSpy.parseUrl.and.returnValue(urlTree);
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};

  const getItemSpy = jasmine.createSpy('getItem').and.returnValue('user|email');
  const getItemSpyWhenNoAuth = jasmine.createSpy('getItem').and.returnValue(null);

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy },
        AuthService,
        { provide: HttpClient, useValue: httpSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should return true when user is authenticated', (done) => {
    localStorage.getItem = getItemSpy;
    const observable: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = guard.canActivate(routeMock, routeStateMock);
    expect(observable instanceof Observable).toBeTrue();
    if (observable instanceof Observable) {
      observable.subscribe((value) => {
        expect(value).toBeTrue();
        done();
      });
    }
  });

  it('canActivate should return true when user is not authenticated', (done) => {
    localStorage.getItem = getItemSpyWhenNoAuth;
    const observable: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree = guard.canActivate(routeMock, routeStateMock);
    expect(observable instanceof Observable).toBeTrue();
    if (observable instanceof Observable) {
      observable.subscribe((value) => {
        expect(value).toEqual(urlTree);
        done();
      });
    }
  });
});
