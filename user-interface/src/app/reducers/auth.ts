import { createReducer, on } from '@ngrx/store';
import { EmailState } from 'src/app/interfaces/state';
import { User } from '../entities/user';
import { addUserEmailToStore, removeUserEmailFromStore } from 'src/app/actions';

const initialState: EmailState = {
  email: null,
  firstName: null,
  lastName: null,
};

export const authReducer = createReducer(
  initialState,
  on(addUserEmailToStore, (state, { userInfo }) => {
    console.log('userInfo', userInfo);
    return {
      ...state,
      ...userInfo,
    };
  }),
  on(removeUserEmailFromStore, (state, action) => {
    console.log(action);
    return {
      ...initialState,
    };
  }),
);