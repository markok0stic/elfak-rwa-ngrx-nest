import {createAction, props} from '@ngrx/store';
import { LoginUser, RegisterUser, User } from '../../models/user/user';

export const loginUser = createAction('[User] Login User',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction('[User] Login Success',
  props<{ data: LoginUser }>()
);
export const loginFailure = createAction('[User] Login Failure',
  props<{ error: string }>()
);
export const logoutUser = createAction('[User] Logout User');

export const editProfile = createAction('[User] Edit Profile',
  props<{ userData: FormData }>()
);
export const editProfileSuccess = createAction('[User] Edit Profile Success',
  props<{ user: User }>()
);
export const setInitialUserState = createAction(
  '[User] Set Initial State',
  props<{ user: User | null; token: string | null }>()
);

export const registerUser = createAction('[Registration] Register User',
  props<{ registerData: RegisterUser}>()
);

export const registerSuccess = createAction('[Registration] Register Success');

export const registerFailure = createAction('[Registration] Register Failure');


