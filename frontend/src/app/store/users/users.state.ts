import { UserModel } from '../../models/user/user.model';
import { State } from '../../models/state';

export type UsersState = State<UserModel> & {
  registration: RegistrationState | null;
}

export interface RegistrationState {
  successfulRegistration: boolean;
  email: string,
  password: string
}
