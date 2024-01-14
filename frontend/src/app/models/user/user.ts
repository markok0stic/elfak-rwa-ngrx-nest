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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: number;
}
