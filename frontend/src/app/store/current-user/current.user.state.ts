import { UserModel } from '../../models/user/user.model';

export interface CurrentUserState {
  isLoading: boolean;
  user: UserModel | null;
  accessToken: string | null;
  error: string | null;
}

