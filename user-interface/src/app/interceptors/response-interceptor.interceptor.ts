import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

export const assign = (evt) => {
  if (evt instanceof HttpResponse && evt.url.match(/courses/)) {
    if (evt.body instanceof Array) {
      evt.body.map(course => {
        course.creationDate = new Date(course.creationDate);
      });
    } else {
      evt.body.creationDate = new Date(evt.body.creationDate);
    }
  }
};

@Injectable()
export class ResponseInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(assign),
    );
  }
}
