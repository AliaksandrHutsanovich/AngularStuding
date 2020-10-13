import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { makeCoursesRequest, loadCourses, reLoadCourses } from 'src/app/actions';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Course } from 'src/app/entities/course';

import { State } from 'src/app/reducers';


@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private courseService: CoursesService,
    private store: Store<State>,
  ) {
  }

  @Effect({ dispatch: false })
  makeCoursesRequest$ = this.actions$.pipe(
    ofType(makeCoursesRequest),
    switchMap(({ index, quantity, searchValue }) => {
      return this.courseService
        .getList(index, quantity, searchValue)
        .pipe(
          map((courses: Course[]) => {
            if (index === 0) {
              this.store.dispatch(reLoadCourses({ courses }));
            } else {
              this.store.dispatch(loadCourses({ courses }));
            }
            this.store.pipe(select('coursesList'))
              .subscribe(({ courses }) => {
                this.courseService.updateCourses(courses);
              });
          }),
        )
    }),
  );
}
