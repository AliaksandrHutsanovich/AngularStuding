import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { EmailState, CoursesState } from 'src/app/interfaces/state';
import { authReducer } from './auth';
import { coursesReducer } from './courses';

export const stateFeatureKey = 'state';

export interface State {
  userInfo: EmailState;
  coursesList: CoursesState,
}

export const reducers: ActionReducerMap<State> = {
  userInfo: authReducer,
  coursesList: coursesReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
