import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { makeCourseRequest } from 'src/app/actions';
import { CoursesService } from 'src/app/services';
import { Course } from 'src/app/entities';

@Injectable()
export class CourseEffects {
  constructor(
    private actions$: Actions,
    private courseService: CoursesService,
  ) {}

  @Effect({ dispatch: false })
  makeCourseRequest$ = this.actions$.pipe(
    ofType(makeCourseRequest),
    switchMap(({ id }) => {
      return this.courseService
        .getItemById(id)
        .pipe(
          map((course: Course) => {
            this.courseService.updateCourse(course);
          }),
        );
    })
  );
}
