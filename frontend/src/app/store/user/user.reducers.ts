import {createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions'
import {UserState} from "./user.state";

export const initialState: UserState = {
  isLoading: false,
  user: null,
  accessToken: null,
  error: null,
  registration: null
};

export const userReducers = createReducer(
  initialState,
  on(UserActions.loginUser, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.logoutUser, () => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
    registration: null
  })),
  on(UserActions.loginSuccess, (state, {data}) => ({
    user: data.user,
    accessToken: data.accessToken,
    isLoading: false,
    error: null,
    registration: null
  })),
  on(UserActions.loginFailure, () => ({
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
    registration: null
  })),
  on(UserActions.setInitialUserState, (state, { user, token }) => ({
    ...state,
    user: user,
    accessToken: token
  })),
  on(UserActions.registerUser, (state) => ({
    ...state,
    isLoading: true,
    registration: null
  })),
  on(UserActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false,
    registration: { successfulRegistration: true }
  })),
  on(UserActions.registerFailure, (state) => ({
    ...state,
    isLoading: false,
    registration: null
  }))
);
