import { TestBed } from '@angular/core/testing';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { ResponseInterceptorInterceptor, assign } from './response-interceptor.interceptor';
import { Observable } from 'rxjs';

describe('ResponseInterceptorInterceptor', () => {
  let interceptor: ResponseInterceptorInterceptor;

  const httpResponseArrayBody = new HttpResponse({
    body: [{
      id: 1,
      title: 'Angular studing. Framework outside and inside',
      creationDate: 'Tue Dec 15 2020 00:00:00 GMT+0300 (Moscow Standard Time)',
      duration: '88',
      description: 'Learn about where you can find course description, what information thay include, how they work and details about various components about course description. Course description report information about a university of college`s classes. They are published both in course catalogs the outline degree requirements and in course schedules that contain for all courses offered during',
      topRated: true,
    }],
    url: 'courses',
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
    url: 'courses',
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

  it('assign should transform response body', () => {
    assign(httpResponseArrayBody);
    expect(typeof httpResponseArrayBody.body[0].creationDate).toEqual('object');

    assign(httpResponseObjectBody);
    expect(typeof httpResponseObjectBody.body.creationDate).toEqual('object');
  });
});
