import { createReducer, on } from '@ngrx/store';
import { CoursesState } from 'src/app/interfaces/state';
import { loadCourses, reLoadCourses } from 'src/app/actions';

const initialState: CoursesState = {
  courses: [],
};

export const coursesReducer = createReducer(
  initialState,
  on(loadCourses, (state, { courses }) => {
    return { courses: [...state.courses.concat(courses)] };
  }),
  on(reLoadCourses, (state, { courses }) => {
    return { courses };
  }),
);
