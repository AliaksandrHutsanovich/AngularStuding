import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { EmailState, CoursesState, CoursesTotalNumState } from 'src/app/interfaces';
import { authReducer } from './auth';
import { coursesReducer } from './courses';
import { coursesTotalNumReducer } from './totalCoursesNum';

export const stateFeatureKey = 'state';

export interface State {
  userInfo: EmailState;
  coursesList: CoursesState,
  totalNum: CoursesTotalNumState,
}

export const reducers: ActionReducerMap<State> = {
  userInfo: authReducer,
  coursesList: coursesReducer,
  totalNum: coursesTotalNumReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
