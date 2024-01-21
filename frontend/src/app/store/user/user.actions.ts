import { createAction, props } from '@ngrx/store';
import { LoginUser, RegisterUser, UserModel } from '../../models/user/user.model';
import { RegistrationState } from './user.state';

export const loginUser = createAction('[UserModel] Login UserModel',
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction('[UserModel] Login Success',
  props<{ data: LoginUser }>(),
);

export const loginFailure = createAction('[UserModel] Login Failure',
  props<{ error: string }>(),
);

export const logoutUser = createAction('[UserModel] Logout UserModel');

export const setInitialUserState = createAction(
  '[UserModel] Set Initial State',
  props<{ user: UserModel | null; token: string | null }>(),
);

export const registerUser = createAction('[Registration] Register UserModel',
  props<{ registerData: RegisterUser }>(),
);

export const registerSuccess = createAction('[Registration] Register Success',
  props<{ successfulRegistrationData: RegistrationState }>(),
);

export const registerFailure = createAction('[Registration] Register Failure',
  props<{ error: string }>(),
);

export const editProfile = createAction('[ProfileEdit] Edit Profile',
  props<{ userData: UserModel }>(),
);

export const editProfileSuccess = createAction('[ProfileEdit] Edit Profile Success',
  props<{ user: UserModel }>(),
);


