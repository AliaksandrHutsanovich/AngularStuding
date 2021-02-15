import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenInterceptorInterceptor } from './token-interceptor.interceptor';

describe('TokenInterceptorInterceptor', () => {
  let interceptor: TokenInterceptorInterceptor;
  const spy = jasmine.createSpy();
  const request = new HttpRequest('GET', 'courses');
  const next: HttpHandler = {
    handle: spy,
  };

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    interceptor = TestBed.inject(TokenInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('next.handle should be called when no token in local storage', () => {
    interceptor = TestBed.inject(TokenInterceptorInterceptor);
    localStorage.getItem = () => undefined;

    interceptor.intercept(request, next);
    expect(spy).toHaveBeenCalledWith(request);
  });

  it('next.handle should be called when token is in local storage', () => {
    interceptor = TestBed.inject(TokenInterceptorInterceptor);
    localStorage.getItem = () => 'token';

    interceptor.intercept(request, next);
    expect(spy).toHaveBeenCalled();
    localStorage.getItem = () => undefined;
  })

});
