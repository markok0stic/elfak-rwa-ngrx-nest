import { createAction, props } from '@ngrx/store';
import { LoginUser, UserModel } from '../../models/user/user.model';

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

export const editSelfProfile = createAction('[ProfileEdit] Edit Self Profile',
  props<{ userData: UserModel }>(),
);

export const editSelfProfileSuccess = createAction('[ProfileEdit] Edit Self Profile Success',
  props<{ user: UserModel }>(),
);


