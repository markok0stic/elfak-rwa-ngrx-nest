import { RolesEnum as Roles } from '@shared/enums/roles.enum';

export interface UserModel {
  id: string;
  email: string;
  role: Roles;
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  zip?: string;
}

export interface LoginUser {
  user: UserModel,
  accessToken: string;
}

export interface BasicInfo {
  firstName: string;
  lastName: string;
  phone: string;
  country: string;
  address?: string;
  city?: string;
  zip?: string;
}

export interface Credentials {
  email: string;
  password: string;
  role: Roles;
}

export type RegisterUser = BasicInfo & Credentials;
