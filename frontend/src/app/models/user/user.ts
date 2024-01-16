import {Roles} from "./roles";

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

export interface BasicInfo {
  firstName: string;
  lastName: string;
  phone: string; address?: string;
  city?: string;
  zip?: string;
}

export interface Credentials {
  email: string;
  password: string;
  role: Roles;
}

export type RegisterUser = BasicInfo & Credentials;
