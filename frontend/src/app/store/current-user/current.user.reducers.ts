import { createReducer, on } from '@ngrx/store';
import * as UserActions from './current.user.actions';
import { CurrentUserState } from './current.user.state';

export const initialState: CurrentUserState = {
  isLoading: false,
  user: null,
  accessToken: null,
  error: null
};

export const currentUserReducers = createReducer(
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
    profileEdit: null
  })),
  on(UserActions.loginFailure, () => (initialState)),
  on(UserActions.setInitialUserState, (state, { user, token }) => ({
    ...state,
    user: user,
    accessToken: token,
  })),
  on(UserActions.editSelfProfileSuccess, (state, { user }) => ({
    ...state,
    user: user,
  }))
);
