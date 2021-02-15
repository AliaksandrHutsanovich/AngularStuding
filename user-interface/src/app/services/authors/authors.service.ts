import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import HOST from 'src/app/constants';

@Injectable()
export class AuthorsService {
  constructor(private httpClient: HttpClient) { }

  getList(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      `${HOST}/authors`,
    );
  }
}
