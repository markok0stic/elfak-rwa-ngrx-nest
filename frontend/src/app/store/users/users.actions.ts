import { createAction, props } from '@ngrx/store';
import { RegisterUser, UserModel } from '../../models/user/user.model';
import { RegistrationState } from './users.state';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction('[Users] Load Users Success',
  props<{ users: UserModel[] }>(),
);

export const loadUsersFailure = createAction('[Users] Load Users Failure',
  props<{ error: any }>(),
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

export const editUserProfile = createAction('[ProfileEdit] Edit User Profile',
  props<{ userData: UserModel }>(),
);

export const editUserProfileSuccess = createAction('[ProfileEdit] Edit User Profile Success',
  props<{ user: UserModel }>(),
);

export const deleteUser = createAction('[Users Delete] Delete User',
  props<{ userId: number }>(),
);

export const deleteUserSuccess = createAction('[Users Delete] Delete User Success',
  props<{ userId: number }>(),
);
