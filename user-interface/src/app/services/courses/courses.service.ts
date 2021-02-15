import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Course } from '../../entities';
import HOST from 'src/app/constants';

@Injectable()
export class CoursesService {
  private subjectforCourses: Subject<Course[]> = new Subject<Course[]>();
  private subjectForCourse: Subject<Course> = new Subject<Course>();
  private subjectToRedirect: Subject<any> = new Subject<any>();
  constructor(private httpClient: HttpClient) { }

  updateCourses(courses: Course[]): void {
    this.subjectforCourses.next(courses);
  }

  updateCourse(course: Course): void {
    this.subjectForCourse.next(course);
  }

  updateAfterEdit(): void {
    this.subjectToRedirect.next();
  }

  getSubjectForCourses(): Subject<Course[]> {
    return this.subjectforCourses;
  }

  getSubjectForCourse(): Subject<Course> {
    return this.subjectForCourse;
  }

  getSubjectToRedirect(): Subject<any> {
    return this.subjectToRedirect;
  }

  getList(start, count, search?): Observable<Course[]> {
    return this.httpClient.get<Course[]>(
      `${HOST}/courses?start=${start}&count=${count}` + (search ? `&search=${search}` : ''),
    );
  };

  addItem(course: Course): Observable<Course> {
    return this.httpClient.post<Course>(
      `${HOST}/courses`,
      course,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        }),
      },
    )
  }

  getItemById(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${HOST}/courses/${id}`);
  }

  updateItem(item: Course): Observable<Course> {
    return this.httpClient.put<Course>(
      `${HOST}/courses/${item.id}`,
      item,
      {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        }),
      },
    );
  }

  removeItem(id: number): Observable<Object> {
    return this.httpClient.delete<Object>(
      `${HOST}/courses/${id}`
    );
  }

}
