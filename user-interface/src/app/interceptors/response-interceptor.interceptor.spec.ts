import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { ResponseInterceptorInterceptor, assign } from './response-interceptor.interceptor';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

describe('ResponseInterceptorInterceptor', () => {
  let interceptor: ResponseInterceptorInterceptor;
  let storeSpy;
  const spyDispatch = jasmine.createSpy();

  beforeEach(() => {
    storeSpy = jasmine.createSpyObj('Store', [
      'dispatch',
    ]);
    storeSpy.dispatch.and.callFake(() => { spyDispatch(); });
    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: storeSpy },
      ],
    })
  });

  afterEach(() => {
    spyDispatch.calls.reset();
  });

  const httpResponseArrayBody = new HttpResponse({
    body: [{
      id: 1,
      title: 'Angular studing. Framework outside and inside',
      creationDate: 'Tue Dec 15 2020 00:00:00 GMT+0300 (Moscow Standard Time)',
      duration: '88',
      description: 'Learn about where you can find course description, what information thay include, how they work and details about various components about course description. Course description report information about a university of college`s classes. They are published both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
      topRated: true,
    }],
    url: 'courses?/1',
  });

  const httpResponseObjectBody = new HttpResponse({
    body: {
      id: 1,
      title: 'Angular studing. Framework outside and inside',
      creationDate: 'Tue Dec 15 2020 00:00:00 GMT+0300 (Moscow Standard Time)',
      duration: '88',
      description: 'Learn about where you can find course description, what information thay include, how they work and details about various components about course description. Course description report information about a university of college`s classes. They are published both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
      topRated: true,
    },
    url: 'courses?/1',
  });

  const httpResponse = new HttpResponse({
    body: {
      id: 1,
      title: 'Angular studing. Framework outside and inside',
      creationDate: 'Tue Dec 15 2020 00:00:00 GMT+0300 (Moscow Standard Time)',
      duration: '88',
      description: 'Learn about where you can find course description, what information thay include, how they work and details about various components about course description. Course description report information about a university of college`s classes. They are published both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
      topRated: true,
    },
    url: 'rrrr',
  });

  const spy = jasmine.createSpy();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponseInterceptorInterceptor
    ],
  }));

  it('should be created', () => {
    interceptor = TestBed.inject(ResponseInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('next.handle should be called', () => {
    interceptor = TestBed.inject(ResponseInterceptorInterceptor);
    const request = new HttpRequest('GET', 'courses');
    const next: HttpHandler = {
      handle: () => {
        const obj = new Observable<HttpEvent<any>>();
        obj.pipe = () => {
          spy();
          return new Observable<HttpEvent<any>>();
        }
        return obj;
      },
    };

    interceptor.intercept(request, next);
    expect(spy).toHaveBeenCalled();
  });

  it('dispatch should be when body is of Array type', async () => {
    await assign(storeSpy)(httpResponseArrayBody);
    expect(spyDispatch).toHaveBeenCalled();
  });

  it('dispatch should not be when body is not of Array type', async () => {
    await assign(storeSpy)(httpResponseObjectBody);
    expect(spyDispatch).not.toHaveBeenCalled();
  });
});
