import {UserModel} from "../../models/user/user.model";

export interface UserState {
  isLoading: boolean;
  user: UserModel | null;
  accessToken: string | null;
  error: string | null;
  registration: RegistrationState | null;
}

export interface RegistrationState {
  successfulRegistration: boolean;
}
