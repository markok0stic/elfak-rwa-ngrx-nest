import {Roles} from "./role";

export interface User {
  id: string;
  email: string;
  role: Roles;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface LoginUser {
  user: User,
  accessToken: string;
}

export interface RegisterUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
}
