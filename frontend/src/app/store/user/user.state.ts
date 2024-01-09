import {User} from "../../models/user/user";

export interface UserState {
  isLoading: boolean;
  user: User | null;
  accessToken: string | null;
  error: string | null;
}
