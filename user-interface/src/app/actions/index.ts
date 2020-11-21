import { createAction, props } from '@ngrx/store';
import { Course, User } from '../entities';

export const addUserEmailToStore = createAction(
  'add_userEmail_to_store',
  props<{ userInfo: User }>()
);

export const removeUserEmailFromStore = createAction(
  'remove_userEmail_from_store',
);

export const makeCoursesRequest = createAction(
  'make_courses_request',
  props<{ index: number, quantity: number, searchValue: string }>()
);

export const loadCourses = createAction(
  'load_courses',
  props<{ courses: Course[] }>()
);

export const reLoadCourses = createAction(
  'reload_courses',
  props<{ courses: Course[] }>()
);

export const makeCourseRequest = createAction(
  'make_course_request',
  props<{ id: number }>()
);

export const editCourseRequest = createAction(
  'edit_course_request',
  props<{ id?: number, course: Course }>()
);
