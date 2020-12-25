import { createReducer, on } from '@ngrx/store';
import { CoursesTotalNumState } from 'src/app/interfaces/state';
import { addTotalNumOfCourses } from 'src/app/actions';

const initialState: CoursesTotalNumState = {
  num: 0,
};

export const coursesTotalNumReducer = createReducer(
  initialState,
  on(addTotalNumOfCourses, (state, { num }) => {
    return { num };
  }),
);
