import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import HOST from 'src/app/constants';
import { User } from '../../entities';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

import { State } from 'src/app/reducers';
import { addUserEmailToStore, removeUserEmailFromStore } from 'src/app/actions';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<State>,
  ) { }

  logIn(user: User): void {
    this.httpClient.post(
      `${HOST}/logIn`,
      user,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        }),
      },
    )
      .subscribe(({ email, firstName, lastName }: User) => {
        localStorage.setItem('userAndAuth', `${email}|${true}`);
        this.store.dispatch(addUserEmailToStore({
          userInfo: {
            email,
            firstName,
            lastName,
          },
        }));
        this.router.navigate(['courses']);
      });
  }

  logOut(): void {
    localStorage.removeItem('userAndAuth');
    this.store.dispatch(removeUserEmailFromStore());
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userAndAuth');
  }

  getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(`${HOST}/logIn`).pipe(
      tap(
        (evt) => {
          if (evt instanceof HttpResponse) {
            this.store.dispatch(addUserEmailToStore(evt.body));
          }
        }
      ),
    );
  }
}
