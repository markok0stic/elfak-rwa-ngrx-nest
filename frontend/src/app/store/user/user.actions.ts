import {createAction, props} from '@ngrx/store';
import { LoginUser, RegisterUser, UserModel } from '../../models/user/user.model';

export const loginUser = createAction('[UserModel] Login UserModel',
  props<{ email: string; password: string }>()
);
export const loginSuccess = createAction('[UserModel] Login Success',
  props<{ data: LoginUser }>()
);
export const loginFailure = createAction('[UserModel] Login Failure',
  props<{ error: string }>()
);
export const logoutUser = createAction('[UserModel] Logout UserModel');

export const editProfile = createAction('[UserModel] Edit Profile',
  props<{ userData: FormData }>()
);
export const editProfileSuccess = createAction('[UserModel] Edit Profile Success',
  props<{ user: UserModel }>()
);
export const setInitialUserState = createAction(
  '[UserModel] Set Initial State',
  props<{ user: UserModel | null; token: string | null }>()
);

export const registerUser = createAction('[Registration] Register UserModel',
  props<{ registerData: RegisterUser}>()
);

export const registerSuccess = createAction('[Registration] Register Success');

export const registerFailure = createAction('[Registration] Register Failure',
  props<{ error: string }>()
);


