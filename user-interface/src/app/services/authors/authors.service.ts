import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorsService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      'http://localhost:3000/authors',
    );
  }
}
