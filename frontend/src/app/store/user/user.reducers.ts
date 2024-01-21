import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from './user.state';

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
  on(UserActions.logoutUser, () => (initialState)),
  on(UserActions.loginSuccess, (state, { data }) => ({
    user: data.user,
    accessToken: data.accessToken,
    isLoading: false,
    error: null,
    registration: null,
    profileEdit: null
  })),
  on(UserActions.loginFailure, () => (initialState)),
  on(UserActions.setInitialUserState, (state, { user, token }) => ({
    ...state,
    user: user,
    accessToken: token,
  })),
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
  on(UserActions.editProfileSuccess, (state, { user }) => ({
    ...state,
    user: user,
  }))
);
