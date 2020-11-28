import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpSpy;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      providers: [
        AuthorsService,
        { provide: HttpClient, useValue: httpSpy },
      ],
    });
    service = TestBed.inject(AuthorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
