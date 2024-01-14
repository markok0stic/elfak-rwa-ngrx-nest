import { createAction, props } from '@ngrx/store';
import { BasicInfo, Credentials, RegisterUser } from './registration.state';

export const registerUser = createAction('[Registration] Register User',
  props<{ registerData: RegisterUser}>()
);
export const registerSuccess = createAction('[Registration] Register Success');
export const registerFailure = createAction('[Registration] Register Failure');

export const setBasicInfo = createAction('[Registration] Set Basic Info',
  props<{ basicInfo: BasicInfo }>()
);

export const setCredentials = createAction('[Registration] Set Credentials',
  props<{ credentials: Credentials }>()
);
