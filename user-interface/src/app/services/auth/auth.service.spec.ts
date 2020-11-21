import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { User } from 'src/app/entities/user';
import { Course } from 'src/app/entities/course';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  const course = new Course(
    4,
    'new course',
    '5-20-2020',
    '23',
    '',
    false,
    [],
  );
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const getItemSpyWhenNoAuth = jasmine.createSpy('getItem').and.returnValue(null);
  let httpSpy;
  let storeSpy;
  const subscribe = (fn) => {
    fn(course);
  };

  beforeEach(() => {
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

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: Store, useValue: storeSpy },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  beforeEach(() => {
    localStorage.getItem = getItemSpyWhenNoAuth;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUserInfo should return user email', () => {
    service.getUserInfo();
    expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:3000/logIn');
  });
});
