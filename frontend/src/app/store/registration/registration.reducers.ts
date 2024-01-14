// src/app/store/registration/registration.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as RegistrationActions from './registration.actions';
import { RegistrationState } from './registration.state';

export const initialState: RegistrationState = {
  isLoading: false,
  currentStep: 1,
  basicInfo: null,
  credentials: null,
};

export const registrationReducers = createReducer(
  initialState,
  on(RegistrationActions.setBasicInfo, (state, { basicInfo }): RegistrationState => ({
    ...state,
    basicInfo,
    currentStep: 2,
  })),
  on(RegistrationActions.setCredentials, (state, { credentials }): RegistrationState => ({
    ...state,
    credentials,
    currentStep: 3,
  })),
  on(RegistrationActions.registerUser, (state) => ({
    ...state,
    isLoading: true
  })),
  on(RegistrationActions.registerSuccess, (state) => ({
    ...state,
    isLoading: false
  })),
  on(RegistrationActions.registerFailure, (state) => ({
    ...state,
    isLoading: false
  }))
);
