import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap } from "rxjs/operators";
import { State } from 'src/app/reducers';
import { addTotalNumOfCourses } from 'src/app/actions';

export const assign = (store: Store<State>) => (evt) => {
  if (evt instanceof HttpResponse && evt.url.match(/courses\?/)) {
    if (evt.body instanceof Array) {
      store.dispatch(addTotalNumOfCourses({ num: +evt.headers.get('x-total-count') }));
    }
  }
};

@Injectable()
export class ResponseInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<State>,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(assign(this.store)),
    );
  }
}
