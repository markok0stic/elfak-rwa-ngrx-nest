import { createReducer, on } from '@ngrx/store';
import * as UserActions from './users.actions';
import { UsersState } from './users.state';

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  registration: null
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({ ...state, loading: false, data: users })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(UserActions.registerUser, (state) => ({
    ...state,
    isLoading: true,
    registration: null,
  })),
  on(UserActions.registerSuccess, (state, { successfulRegistrationData }) => ({
    ...state,
    isLoading: false,
    registration: {
      successfulRegistration: successfulRegistrationData.successfulRegistration,
      password: successfulRegistrationData.password,
      email: successfulRegistrationData.email,
    },
  })),
  on(UserActions.registerFailure, (state) => ({
    ...state,
    isLoading: false,
    registration: null,
  })),
);
