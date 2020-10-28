import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { editCourseRequest } from 'src/app/actions';
import { CoursesService } from 'src/app/services/courses/courses.service';
import { Course } from 'src/app/entities/course';

@Injectable()
export class EditCourseEffects {
  constructor(
    private actions$: Actions,
    private courseService: CoursesService,
  ) {}

  @Effect({ dispatch: false })
  editCourseRequest$ = this.actions$.pipe(
    ofType(editCourseRequest),
    switchMap(({ id, course }) => {
      return (
        id
          ? this.courseService.updateItem(course)
          : this.courseService.addItem(course)
      )
        .pipe(
          map(() => {
            this.courseService.updateAfterEdit();
          }),
        );
    }),
  );
}
